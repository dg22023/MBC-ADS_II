import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Space } from '../booking/booking';
import { Bookingservice } from '../../services/bookingservice/bookingservice';

// Importaciones de Angular Material
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-spaceselector-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './spaceselector-dialog.html',
  styleUrl: './spaceselector-dialog.css'
})
export class SpaceselectorDialog {

  spaces$: Observable<Space[]>;

  constructor(
    private bookingService: Bookingservice,
    public dialogRef: MatDialogRef<SpaceselectorDialog>
  ) {
    this.spaces$ = this.bookingService.getSpaces();
  }

  // Cierra el modal y devuelve el 'space' seleccionado
  onSpaceSelected(space: Space): void {
    this.dialogRef.close(space);
  }

  // Cierra el modal sin devolver datos
  onClose(): void {
    this.dialogRef.close();
  }

}
