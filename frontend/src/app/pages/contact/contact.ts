import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  template: `
    <div class="contact-page">
      <div class="hero-section">
        <h1>Contáctanos</h1>
        <p>Nos encantaría saber de ti</p>
      </div>

      <div class="content-section">
        <mat-card class="contact-form-card">
          <mat-card-header>
            <mat-card-title>Envíanos un Mensaje</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <form class="contact-form">
              <mat-form-field appearance="outline">
                <mat-label>Nombre</mat-label>
                <input matInput [(ngModel)]="name" name="name" required>
                <mat-icon matPrefix>person</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Correo Electrónico</mat-label>
                <input matInput type="email" [(ngModel)]="email" name="email" required>
                <mat-icon matPrefix>email</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Asunto</mat-label>
                <input matInput [(ngModel)]="subject" name="subject" required>
                <mat-icon matPrefix>subject</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Mensaje</mat-label>
                <textarea matInput rows="6" [(ngModel)]="message" name="message" required></textarea>
              </mat-form-field>

              <button mat-raised-button color="primary" (click)="sendMessage()">
                <mat-icon>send</mat-icon>
                Enviar Mensaje
              </button>
            </form>
          </mat-card-content>
        </mat-card>

        <div class="contact-info">
          <mat-card class="info-card">
            <mat-icon>location_on</mat-icon>
            <h3>Dirección</h3>
            <p>Calle Empresarial 123<br>San Salvador, El Salvador</p>
          </mat-card>

          <mat-card class="info-card">
            <mat-icon>phone</mat-icon>
            <h3>Teléfono</h3>
            <p>+503 2222-3333</p>
          </mat-card>

          <mat-card class="info-card">
            <mat-icon>email</mat-icon>
            <h3>Correo Electrónico</h3>
            <p>info@mini-booking.com</p>
          </mat-card>

          <mat-card class="info-card">
            <mat-icon>schedule</mat-icon>
            <h3>Horario</h3>
            <p>Lunes - Viernes<br>8:00 AM - 6:00 PM</p>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-page {
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
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    .contact-form-card {
      border-radius: 12px;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .contact-form mat-form-field {
      width: 100%;
    }

    .contact-form button {
      align-self: flex-start;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .contact-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .info-card {
      padding: 1.5rem;
      text-align: center;
      border-radius: 12px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .info-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 40, 85, 0.1);
    }

    .info-card mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #002855;
      margin-bottom: 1rem;
    }

    .info-card h3 {
      color: #002855;
      margin: 0.5rem 0;
      font-weight: 600;
    }

    .info-card p {
      color: #666;
      margin: 0;
    }

    @media (max-width: 968px) {
      .content-section {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .contact-page {
        padding: 1rem;
      }

      .hero-section h1 {
        font-size: 2rem;
      }

      .contact-info {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactComponent {
  name = '';
  email = '';
  subject = '';
  message = '';

  sendMessage() {
    console.log('Message sent:', {
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message
    });
    // Here you would typically send this to your backend
    alert('Thank you for your message! We will get back to you soon.');
    // Reset form
    this.name = '';
    this.email = '';
    this.subject = '';
    this.message = '';
  }
}
