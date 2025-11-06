import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  templateUrl: './landing.html'
})
export class LandingComponent {
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

  onSelectDate(d: Date | null) {
    this.selectedDate = d;
  }

  onAction(room: any) {
    console.log('Acción:', room);
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
}
