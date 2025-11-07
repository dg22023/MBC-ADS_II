import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Módulos Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Bookingform } from '../../components/bookingform/bookingform';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatSidenavModule
  ],
  templateUrl: './landing.html',
  styleUrls: ['./landing.css']
})
export class LandingComponent {
  constructor(private router: Router) {}

  title = 'MiniBookingUES — Reserva tu espacio fácil y rápido';
  subtitle =
    'Explora espacios, elige una fecha y selecciona un horario. Al reservar se requerirá autenticación.';

  selectedDate: Date | null = null;

  rooms = [
    {
      id: 1,
      name: 'ROOM 1',
      subtitle: 'Sala Reuniones',
      description: 'Sala ideal para reuniones cortas y llamadas',
      features: ['WiFi', 'Pizarra', 'Enchufe'],
      cta: 'Ver horarios'
    },
    {
      id: 2,
      name: 'ROOM 2',
      subtitle: 'Workshop',
      description: 'Espacio para talleres y sesiones colaborativas',
      features: ['Pantalla', 'Mesas modulares', 'Café'],
      cta: 'Ver horarios'
    },
    {
      id: 3,
      name: 'ROOM 3',
      subtitle: 'Hotdesk 1',
      description: 'Puesto individual en área compartida',
      features: ['WiFi', 'Enchufe'],
      cta: 'Reservar'
    }
  ];

  constructor(private dialog: MatDialog) {}



  onSelectDate(d: Date | null) {
    this.selectedDate = d;
  }

  onAction(room: any) {
    if (room.id === 1 || room.id === 2) {
      this.router.navigate(['/rooms', room.id]);
    } else {
      console.log('Acción:', room);
    }
  }

  onBook() {
    window.location.href = '/login';
  }

  onLogin() {
    window.location.href = '/login';
  }

  onSignup() {
    window.location.href = '/signup';
  }

  // --- ¡NUEVO MÉTODO! ---
  // Este método abre el formulario de reserva
  openBookingModal(): void {
    const dialogRef = this.dialog.open(Bookingform, {
      width: '600px',        // Un ancho adecuado para el formulario
      maxWidth: '90vw',      // Responsive en móviles
      autoFocus: false,      // Evita que el primer campo se enfoque auto.
      disableClose: true,    // Opcional: Evita que se cierre al hacer clic fuera
    });

    // Opcional: Escuchar cuando el modal se cierra
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal de reserva se cerró');
      if (result === true) {
        // El 'true' lo enviamos desde el form al reservar con éxito
        console.log('¡Reserva creada! (Podrías recargar datos aquí)');
      }
    });

  
}
}
