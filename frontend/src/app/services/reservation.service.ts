import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Space } from '../models/space.model';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private spaces: Space[] = [
    {
      id: 1, name: 'Aula 101', description: 'Aula con proyector',
      type: 'Aula', capacity: 40,
      imageUrl: '', availableTimes: ['08:00','09:00','10:00','14:00','15:00']
    },
    {
      id: 2, name: 'Laboratorio 3', description: 'PCs + equipo',
      type: 'Laboratorio', capacity: 20,
      imageUrl: '', availableTimes: ['09:00','11:00','13:00','15:00']
    },
    {
      id: 3, name: 'Sala de reuniones', description: 'Sala pequeña',
      type: 'Sala', capacity: 10,
      imageUrl: '', availableTimes: ['08:00','10:00','16:00']
    }
    ,
    {
      id: 4, name: 'Aula 202', description: 'Aula grande con sistema híbrido',
      type: 'Aula', capacity: 80,
      imageUrl: '', availableTimes: ['08:00','08:15','08:30','09:00','10:00','18:00']
    },
    {
      id: 5, name: 'Laboratorio 5', description: 'Laboratorio de cómputo avanzado',
      type: 'Laboratorio', capacity: 24,
      imageUrl: '', availableTimes: ['07:30','08:00','09:15','11:30','14:00']
    },
    {
      id: 6, name: 'Sala Ejecutiva', description: 'Sala con videoconferencia y TV',
      type: 'Sala', capacity: 12,
      imageUrl: '', availableTimes: ['09:00','09:15','10:00','15:00','16:30']
    },
    {
      id: 7, name: 'Aula Híbrida', description: 'Aula con cámaras y micrófonos',
      type: 'Aula', capacity: 50,
      imageUrl: '', availableTimes: ['06:00','06:15','12:00','14:45','19:00']
    }
  ];

  private reservations: Reservation[] = []; // guardadas en memoria

  // Exponer como observable para que componentes se actualicen
  private reservations$ = new BehaviorSubject<Reservation[]>(this.reservations);

  constructor() {}

  getSpaces(): Observable<Space[]> {
    return of(this.spaces);
  }

  getSpaceById(id: number): Observable<Space | undefined> {
    return of(this.spaces.find(s => s.id === id));
  }

  getReservations(): Observable<Reservation[]> {
    return this.reservations$.asObservable();
  }

  addReservation(res: Reservation): Observable<Reservation> {
    // crear id simple incremental
    res.id = (this.reservations.length ? Math.max(...this.reservations.map(r => r.id || 0)) + 1 : 1);
    this.reservations.push(res);
    this.reservations$.next(this.reservations);
    return of(res);
  }

  isTimeAvailable(spaceId: number, date: string, time: string): boolean {
    return !this.reservations.some(r => r.spaceId === spaceId && r.date === date && r.time === time);
  }
}
