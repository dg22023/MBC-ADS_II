// src/app/pages/landing/landing.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Angular Material modules usados en la vista:
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
    MatSidenavModule,
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
      name: 'ROOM 1 — Sala Aurora',
      subtitle: 'Sala de Reuniones / Workspace',
      description:
        'Espacio de trabajo para 2 personas. Espacio cómodo para laptops, con acceso a internet y cafetera.',
      features: ['WiFi', 'Pizarra', 'Enchufe', 'Cafetera'],
      cta: 'Agendar'
    },
    {
      id: 2,
      name: 'ROOM 2 — Sala Brisa',
      subtitle: 'Workshop / Taller',
      description:
        'Espacio para 5 personas, con mesas modulares y cafetera. Ideal para sesiones prácticas.',
      features: ['Pantalla', 'Mesas modulares', 'Café', 'WiFi'],
      cta: 'Reservar'
    },
    {
      id: 3,
      name: 'ROOM 3 — Sala Atlas',
      subtitle: 'Mesa de juntas / Presentaciones',
      description:
        'Sala para 10 personas con mesa de juntas, proyector y enchufes múltiples.',
      features: ['Mesa de juntas', 'Proyector', 'WiFi', 'Enchufes'],
      cta: 'Reservar'
    }
  ];

  onAction(room: any) {
    const queryParams: any = {};

    if (this.selectedDate) {
      queryParams.date = this.selectedDate.toISOString().split('T')[0];
    }

    this.router.navigate(['/rooms', room.id], { queryParams });
  }

  onBook() { this.router.navigate(['/login']); }
  onLogin() { this.router.navigate(['/login']); }
  onSignup() { this.router.navigate(['/signup']); }
}
