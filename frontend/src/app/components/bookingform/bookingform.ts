import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Bookingservice } from '../../services/bookingservice/bookingservice';
import { Space } from '../../models/booking/booking';

// Importaciones de Angular Material
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatIconModule } from '@angular/material/icon';
import { SpaceselectorDialog } from '../../models/spaceselector-dialog/spaceselector-dialog';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@Component({
  selector: 'app-bookingform',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatIconModule
  ],
  standalone: true,
  templateUrl: './bookingform.html',
  styleUrl: './bookingform.css'
})
export class Bookingform {
  bookingForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  selectedSpaceName: string | null = null;

  constructor(
    private fb: FormBuilder,
    private bookingService: Bookingservice,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private dialogRef: MatDialogRef<Bookingform> 
  ) {
    this.bookingForm = this.fb.group({
      spaceId: ['', Validators.required], 
      bookingDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }
  

  /**
   * Abre el modal para seleccionar el espacio.
   */
  openSpaceSelector(): void {
    const dialogRef = this.dialog.open(SpaceselectorDialog , {
      width: '400px',
    });

    // Se subscribe a cuándo se cierra el modal
    dialogRef.afterClosed().subscribe((selectedSpace: Space | undefined) => {
      if (selectedSpace) {
        // Actualiza el formulario con el ID
        this.bookingForm.patchValue({
          spaceId: selectedSpace.id
        });
        // Guarda el nombre para mostrarlo al usuario
        this.selectedSpaceName = selectedSpace.name;
        this.bookingForm.get('spaceId')?.markAsTouched();
      }
    });
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    const formValues = this.bookingForm.value;

    // Combinar Fecha y Hora en objetos Date
    const bookingDate = new Date(formValues.bookingDate);
    const dateStr = bookingDate.toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Convert 12-hour format to 24-hour format
    const convert12to24 = (time12h: string): string => {
      const [time, modifier] = time12h.split(' ');
      let [hours, minutes] = time.split(':');
      
      if (hours === '12') {
        hours = '00';
      }
      
      if (modifier === 'PM') {
        hours = String(parseInt(hours, 10) + 12);
      }
      
      return `${hours.padStart(2, '0')}:${minutes}`;
    };
    
    const startTime24 = convert12to24(formValues.startTime);
    const endTime24 = convert12to24(formValues.endTime);
    
    const startTime = new Date(`${dateStr}T${startTime24}:00`);
    const endTime = new Date(`${dateStr}T${endTime24}:00`);

    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      this.errorMessage = 'Formato de fecha u hora inválido. Por favor, verifica los campos.';
      return;
    }

    if (endTime <= startTime) {
      this.errorMessage = 'La hora de fin debe ser posterior a la hora de inicio.';
      return;
    }

    const newBookingData = {
      spaceId: Number(formValues.spaceId),
      userId: 1, // TODO: Obtener del usuario autenticado (temporal: usar ID 1)
      startTime: startTime,
      endTime: endTime
    };

    // Llamar al servicio
    this.bookingService.createBooking(newBookingData).subscribe({
      next: (response) => {
        this.successMessage = `¡Reserva creada exitosamente! ${response.message}`;
        this.errorMessage = null;
        this.cdr.detectChanges();
        
        // Cerrar el modal después de mostrar el mensaje de éxito
        setTimeout(() => {
          this.dialogRef.close(true);
        }, 3000);
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.successMessage = null;
        this.cdr.detectChanges();
      }
    });
    
  }

  /**
   * Cierra el modal sin guardar cambios
   */
  closeModal(): void {
    this.dialogRef.close();
  }
}