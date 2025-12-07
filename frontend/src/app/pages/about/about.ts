import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="about-page">
      <div class="hero-section">
        <h1>Acerca de Mini-Booking</h1>
        <p>Tu socio de confianza para soluciones de espacios de trabajo flexibles</p>
      </div>

      <div class="content-section">
        <mat-card class="info-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>business</mat-icon>
            <mat-card-title>Nuestra Misión</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>
              Mini-Booking fue creado para simplificar el proceso de encontrar y reservar espacios de trabajo.
              Ya sea que necesites un lugar tranquilo para trabajo concentrado, una sala para reuniones de equipo, o un
              espacio creativo para talleres, te tenemos cubierto.
            </p>
          </mat-card-content>
        </mat-card>

        <mat-card class="info-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>groups</mat-icon>
            <mat-card-title>Nuestra Historia</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>
              Fundado en 2025, Mini-Booking surgió de la necesidad de soluciones de espacios de trabajo flexibles y accesibles.
              Entendemos que el trabajo moderno requiere soluciones modernas, y estamos aquí
              para proveerlas.
            </p>
          </mat-card-content>
        </mat-card>

        <mat-card class="info-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>verified</mat-icon>
            <mat-card-title>¿Por Qué Elegirnos?</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <ul>
              <li>Espacios verificados de alta calidad</li>
              <li>Confirmación de reserva instantánea</li>
              <li>Opciones de precios flexibles</li>
              <li>Soporte al cliente 24/7</li>
              <li>Procesamiento de pagos seguro</li>
            </ul>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .about-page {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .hero-section {
      text-align: center;
      margin-bottom: 3rem;
      padding: 2rem 0;
    }

    .hero-section h1 {
      font-size: 2.5rem;
      color: #002855;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .hero-section p {
      font-size: 1.25rem;
      color: #666;
    }

    .content-section {
      display: grid;
      gap: 2rem;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }

    .info-card {
      border-radius: 12px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .info-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 40, 85, 0.1);
    }

    .info-card mat-card-header {
      margin-bottom: 1rem;
    }

    .info-card mat-icon[mat-card-avatar] {
      background: #002855;
      color: white;
      font-size: 28px;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }

    .info-card mat-card-title {
      color: #002855;
      font-weight: 600;
    }

    .info-card ul {
      list-style: none;
      padding: 0;
    }

    .info-card ul li {
      padding: 0.5rem 0;
      padding-left: 1.5rem;
      position: relative;
    }

    .info-card ul li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #002855;
      font-weight: bold;
    }

    @media (max-width: 768px) {
      .about-page {
        padding: 1rem;
      }

      .hero-section h1 {
        font-size: 2rem;
      }

      .content-section {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AboutComponent {}
