import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Bookingservice } from '../../services/bookingservice/bookingservice';
import { Space } from '../../models/booking/booking';
import { Observable } from 'rxjs'; // <-- No se usa, pero lo dejo por si acaso

// Importaciones de Angular Material
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog'; // <-- AÑADIDO: MatDialogRef
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatIconModule } from '@angular/material/icon'; // <-- AÑADIDO: MatIconModule

// El componente Modal
import { SpaceselectorDialog } from '../../models/spaceselector-dialog/spaceselector-dialog';

@Component({
  selector: 'app-bookingform',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule // <-- AÑADIDO: Para el botón de cierre
  ],
  standalone:true,
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
    private dialog: MatDialog, // Servicio para abrir *otros* modales
    
    // AÑADIDO: Referencia a *este* modal para poder cerrarlo
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
    const startTime = new Date(`${formValues.bookingDate}T${formValues.startTime}`);
    const endTime = new Date(`${formValues.bookingDate}T${formValues.endTime}`);

    if (endTime <= startTime) {
      this.errorMessage = 'La hora de fin debe ser posterior a la hora de inicio.';
      return;
    }

    const newBookingData = {
      spaceId: formValues.spaceId,
      userId: 'mock-user-123',
      startTime: startTime,
      endTime: endTime
    };

    // Llamar al servicio
    this.bookingService.createBooking(newBookingData).subscribe({
      next: (createdBooking) => {
        if (createdBooking) {
          this.successMessage = `¡Reserva creada! ID: ${createdBooking.id} para ${this.selectedSpaceName}`;
          
          // --- MODIFICADO ---
          // En lugar de resetear el form, esperamos 1.5s y cerramos el modal
          // enviando 'true' para avisar al LandingComponent que todo salió bien.
          setTimeout(() => {
            this.dialogRef.close(true);
          }, 1500); // 1.5 segundos para que el usuario lea el mensaje
        }
      },
      error: (err) => {
        // Captura el error del servicio
        this.errorMessage = err.message;
      }
    });
    
  }

  /**
   * Método para el botón 'X' de cancelar
   * (Este método ya lo tenías, pero ahora funcionará
   * gracias a la inyección de MatDialogRef)
   */
  closeModal(): void {
    this.dialogRef.close(); // Cierra el modal sin enviar datos
  }
}