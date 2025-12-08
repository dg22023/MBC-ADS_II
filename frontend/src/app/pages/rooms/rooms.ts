// src/app/pages/rooms/rooms.ts
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, RouterModule],
  templateUrl: './rooms.html',
  styleUrls: ['./rooms.css']
})
export class Rooms {
  roomId: number | null = null;
  roomTitle = '';
  roomDescription = '';
  subtitle = '';
  capacity = 0;
  features: string[] = [];
  actionLabel = 'Reservar';
  selectedDate: Date | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.roomId = Number(this.route.snapshot.paramMap.get('id'));

    this.route.queryParamMap.subscribe(q => {
      const d = q.get('date');
      if (d) {
        this.selectedDate = new Date(d + 'T00:00:00');
      }
    });

    this.loadRoomData();
  }

  loadRoomData() {
    if (this.roomId === 1) {
      this.roomTitle = 'ROOM 1 — Sala Aurora';
      this.subtitle = 'Sala de Reuniones / Workspace';
      this.capacity = 2;
      this.roomDescription = 'Espacio de trabajo para 2 personas con internet y cafetera.';
      this.features = ['WiFi', 'Pizarra', 'Enchufe', 'Cafetera'];
      this.actionLabel = 'Reservar';
    } else if (this.roomId === 2) {
      this.roomTitle = 'ROOM 2 — Sala Brisa';
      this.subtitle = 'Workshop / Taller';
      this.capacity = 5;
      this.roomDescription = 'Espacio para talleres y trabajo colaborativo.';
      this.features = ['Pantalla', 'Mesas modulares', 'Café', 'WiFi'];
      this.actionLabel = 'Reservar';
    } else if (this.roomId === 3) {
      this.roomTitle = 'ROOM 3 — Sala Atlas';
      this.subtitle = 'Mesa de juntas / Presentaciones';
      this.capacity = 10;
      this.roomDescription = 'Sala con mesa de juntas y proyector.';
      this.features = ['Mesa de juntas', 'Proyector', 'WiFi', 'Enchufes múltiples'];
      this.actionLabel = 'Reservar';
    } else {
      this.roomTitle = 'Room no encontrado';
      this.roomDescription = 'La sala solicitada no existe.';
      this.features = [];
      this.actionLabel = 'Volver';
    }
  }

  onPrimaryAction() {
    if (this.roomId) {
      this.router.navigate(['/rooms', this.roomId], { queryParamsHandling: 'preserve' });
      return;
    }
    this.router.navigate(['/landing']);
  }
}
