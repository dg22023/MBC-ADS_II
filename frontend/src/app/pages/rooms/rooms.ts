import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.roomId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadRoomData();
  }

  loadRoomData() {
    if (this.roomId === 1) {
      this.roomTitle = 'ROOM 1 — Sala de Reuniones';
      this.roomDescription = 'Espacio cómodo y equipado para reuniones breves.';
    } else if (this.roomId === 2) {
      this.roomTitle = 'ROOM 2 — Workshop';
      this.roomDescription = 'Ideal para talleres y sesiones colaborativas.';
    } else {
      this.roomTitle = 'Room no encontrado';
      this.roomDescription = 'La sala solicitada no existe.';
    }
  }
}
