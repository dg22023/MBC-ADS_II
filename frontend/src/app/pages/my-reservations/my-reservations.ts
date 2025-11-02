import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-reservations',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-reservations.html',
  styleUrl: './my-reservations.css'
})
export class MyReservations implements OnInit {
  reservations: any[] = [];
  editingReservation: any = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.apiService.getMyActiveReservations().subscribe(data => {
      this.reservations = data;
    });
  }

  editReservation(reservation: any): void {
    this.editingReservation = { ...reservation };
  }

  saveReservation(): void {
    if (this.editingReservation) {
      const { id, ...updateData } = this.editingReservation;
      this.apiService.updateReservation(id, updateData).subscribe(() => {
        this.loadReservations();
        this.editingReservation = null;
      });
    }
  }

  cancelEdit(): void {
    this.editingReservation = null;
  }

  cancelReservation(id: number): void {
    this.apiService.cancelReservation(id).subscribe(() => {
      this.loadReservations();
    });
  }
}
