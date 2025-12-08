import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// Módulos Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

// Import booking form
import { Bookingform, BookingDialogData } from '../../components/bookingform/bookingform';

interface SpaceData {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  features: { icon: string; text: string }[];
  price: string;
  capacity: string;
  amenities: string[];
}

@Component({
  selector: 'app-spaces',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './spaces.html',
  styleUrls: ['./spaces.css']
})
export class SpacesComponent {
  loading = false;
  
  spaces: SpaceData[] = [
    {
      id: 1,
      name: 'Sala de Conferencias A',
      subtitle: 'Espacio de Reuniones',
      description: 'Sala de conferencias profesional perfecta para reuniones de equipo y presentaciones.',
      features: [
        { icon: 'wifi', text: 'WiFi' },
        { icon: 'tv', text: 'Pantalla' },
        { icon: 'meeting_room', text: '10 Personas' }
      ],
      price: '$25',
      capacity: '10 personas',
      amenities: ['WiFi de alta velocidad', 'Pantalla 4K de 65"', 'Videoconferencia', 'Pizarra', 'Café y Agua']
    },
    {
      id: 2,
      name: 'Espacio de Taller',
      subtitle: 'Estudio Creativo',
      description: 'Espacio flexible ideal para talleres, sesiones de capacitación y trabajo colaborativo.',
      features: [
        { icon: 'wifi', text: 'WiFi' },
        { icon: 'table_restaurant', text: 'Mesas Modulares' },
        { icon: 'coffee', text: 'Bar de Café' }
      ],
      price: '$40',
      capacity: '20 personas',
      amenities: ['WiFi de alta velocidad', 'Mobiliario Modular', 'Bar de Café', 'Proyector', 'Sistema de Sonido', 'Iluminación Natural']
    },
    {
      id: 3,
      name: 'Oficina Privada',
      subtitle: 'Espacio de Trabajo Individual',
      description: 'Oficina privada tranquila perfecta para trabajo enfocado o reuniones 1-a-1.',
      features: [
        { icon: 'wifi', text: 'WiFi' },
        { icon: 'desk', text: 'Escritorio de Pie' },
        { icon: 'lock', text: 'Con Cerradura' }
      ],
      price: '$15',
      capacity: '1-2 personas',
      amenities: ['WiFi de alta velocidad', 'Escritorio de Pie', 'Silla Ergonómica', 'Monitor', 'Cerradura Privada', 'Cabina Telefónica']
    },
    {
      id: 4,
      name: 'Sala de Juntas Ejecutiva',
      subtitle: 'Espacio Premium de Reuniones',
      description: 'Sala de juntas lujosa para reuniones ejecutivas y presentaciones importantes.',
      features: [
        { icon: 'wifi', text: 'WiFi' },
        { icon: 'smartphone', text: 'Controles Inteligentes' },
        { icon: 'groups', text: '16 Personas' }
      ],
      price: '$60',
      capacity: '16 personas',
      amenities: ['WiFi ultra rápido', 'Controles de Sala Inteligentes', 'Pantalla de 85"', 'Sistema A/V Premium', 'Servicio de Catering', 'Videoconferencia']
    },
    {
      id: 5,
      name: 'Estudio Creativo',
      subtitle: 'Espacio de Diseño e Innovación',
      description: 'Espacio vibrante diseñado para equipos creativos, lluvia de ideas y trabajo de diseño.',
      features: [
        { icon: 'wifi', text: 'WiFi' },
        { icon: 'palette', text: 'Material de Arte' },
        { icon: 'lightbulb', text: 'Pared de Inspiración' }
      ],
      price: '$35',
      capacity: '12 personas',
      amenities: ['WiFi de alta velocidad', 'Paredes de Pizarra', 'Material de Arte', 'Iluminación Ajustable', 'Puffs', 'Sistema de Música']
    },
    {
      id: 6,
      name: 'Cápsula Silenciosa',
      subtitle: 'Cabina de Concentración',
      description: 'Cabina insonorizada para llamadas telefónicas, videollamadas o trabajo profundo.',
      features: [
        { icon: 'wifi', text: 'WiFi' },
        { icon: 'headset_mic', text: 'Insonorizada' },
        { icon: 'person', text: '1 Persona' }
      ],
      price: '$10',
      capacity: '1 persona',
      amenities: ['WiFi', 'Insonorización', 'Carga USB', 'Ventilación', 'Luz de Escritorio', 'Asiento Ajustable']
    },
    {
      id: 7,
      name: 'Centro de Colaboración',
      subtitle: 'Espacio Abierto de Trabajo',
      description: 'Espacio abierto dinámico para colaboración en equipo y trabajo ágil.',
      features: [
        { icon: 'wifi', text: 'WiFi' },
        { icon: 'devices', text: 'Múltiples Pantallas' },
        { icon: 'group_work', text: '8 Personas' }
      ],
      price: '$30',
      capacity: '8 personas',
      amenities: ['WiFi de alta velocidad', 'Múltiples Pantallas', 'Pizarra', 'Escritorios de Pie', 'Asientos Lounge', 'Tomas de Corriente']
    },
    {
      id: 8,
      name: 'Sala de Capacitación',
      subtitle: 'Espacio Educativo',
      description: 'Sala estilo aula perfecta para sesiones de capacitación y talleres.',
      features: [
        { icon: 'wifi', text: 'WiFi' },
        { icon: 'school', text: 'Estilo Aula' },
        { icon: 'groups_3', text: '25 Personas' }
      ],
      price: '$50',
      capacity: '25 personas',
      amenities: ['WiFi de alta velocidad', 'Proyector y Pantalla', 'Escritorios Individuales', 'Equipo A/V', 'Rotafolios', 'Estación de Agua']
    },
    {
      id: 9,
      name: 'Estudio de Podcast',
      subtitle: 'Espacio de Grabación',
      description: 'Estudio de grabación profesional para podcasts, videos y contenido de audio.',
      features: [
        { icon: 'wifi', text: 'WiFi' },
        { icon: 'mic', text: 'Audio Pro' },
        { icon: 'videocam', text: 'Setup de Video' }
      ],
      price: '$45',
      capacity: '4 personas',
      amenities: ['WiFi', 'Micrófonos Profesionales', 'Cámaras 4K', 'Kit de Iluminación', 'Insonorización', 'Estación de Edición']
    }
  ];

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) { }

  bookSpace(space: SpaceData) {
    const dialogData: BookingDialogData = {
      spaceName: space.name,
      spaceId: space.id,
      spacePrice: space.price + '/hour'
    };

    const dialogRef = this.dialog.open(Bookingform, {
      width: '700px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      autoFocus: false,
      disableClose: false,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        console.log('Booking completed successfully!');
      }
    });
  }

  viewDetails(space: SpaceData) {
    const dialogRef = this.dialog.open(SpaceDetailsDialog, {
      width: '600px',
      maxWidth: '90vw',
      data: space
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result?.action === 'book') {
        this.bookSpace(result.space);
      }
    });
  }
}

// Space Details Dialog Component
import { Component as NgComponent, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@NgComponent({
  selector: 'space-details-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <div class="details-header">
      <h2>{{ data.name }}</h2>
      <button mat-icon-button (click)="close()">
        <mat-icon>close</mat-icon>
      </button>
    </div>
    <div class="details-content">
      <p class="subtitle">{{ data.subtitle }}</p>
      <p class="description">{{ data.description }}</p>
      
      <div class="detail-section">
        <h3><mat-icon>group</mat-icon> Capacidad</h3>
        <p>{{ data.capacity }}</p>
      </div>

      <div class="detail-section">
        <h3><mat-icon>attach_money</mat-icon> Precio</h3>
        <p class="price">{{ data.price }}/hora</p>
      </div>

      <div class="detail-section">
        <h3><mat-icon>check_circle</mat-icon> Amenidades</h3>
        <ul class="amenities-list">
          <li *ngFor="let amenity of data.amenities">
            <mat-icon>check</mat-icon> {{ amenity }}
          </li>
        </ul>
      </div>

      <button mat-raised-button color="primary" class="book-btn" (click)="bookSpace()">
        <mat-icon>event</mat-icon>
        Reservar Este Espacio
      </button>
    </div>
  `,
  styles: [`
    .details-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      background: linear-gradient(135deg, #002855 0%, #004e8c 100%);
      color: white;
    }

    .details-header h2 {
      margin: 0;
      font-size: 1.75rem;
      font-weight: 600;
    }

    .details-header button {
      color: white;
    }

    .details-content {
      padding: 24px;
    }

    .subtitle {
      color: #666;
      font-size: 1.1rem;
      margin-bottom: 16px;
    }

    .description {
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 24px;
    }

    .detail-section {
      margin-bottom: 24px;
    }

    .detail-section h3 {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #002855;
      font-size: 1.2rem;
      margin-bottom: 12px;
    }

    .detail-section h3 mat-icon {
      color: #002855;
    }

    .price {
      font-size: 1.5rem;
      font-weight: 700;
      color: #002855;
    }

    .amenities-list {
      list-style: none;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
    }

    .amenities-list li {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      background: #f0f4f8;
      border-radius: 8px;
    }

    .amenities-list li mat-icon {
      color: #28a745;
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .book-btn {
      width: 100%;
      height: 48px;
      font-size: 1.1rem;
      font-weight: 600;
      margin-top: 8px;
      background: linear-gradient(135deg, #002855 0%, #004e8c 100%) !important;
    }
  `]
})
export class SpaceDetailsDialog {
  constructor(
    public dialogRef: MatDialogRef<SpaceDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: SpaceData
  ) { }

  close() {
    this.dialogRef.close();
  }

  bookSpace() {
    this.dialogRef.close({ action: 'book', space: this.data });
  }
}
