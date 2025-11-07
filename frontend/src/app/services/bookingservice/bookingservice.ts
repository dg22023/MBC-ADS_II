import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Booking, Space } from '../../models/booking/booking';

@Injectable({
  providedIn: 'root'
})

export class Bookingservice {
  // --- DATOS ESTÁTICOS (MOCK DATA) ---

  // Lista de espacios disponibles
  private mockSpaces: Space[] = [
    { id: 'S1', name: 'Sala de Juntas A', capacity: 10 },
    { id: 'S2', name: 'Oficina Privada B', capacity: 4 },
    { id: 'S3', name: 'Área Abierta C', capacity: 20 }
  ];

  // Lista de reservas existentes (aquí se guardarán las nuevas)
  private mockBookings: Booking[] = [
    // Una reserva de ejemplo para la Sala A
    {
      id: 'B1',
      spaceId: 'S1',
      userId: 'user-admin',
      startTime: new Date('2025-11-10T09:00:00'),
      endTime: new Date('2025-11-10T10:30:00')
    }
  ];

  constructor() { }

  // Obtener los espacios
  getSpaces(): Observable<Space[]> {
    return of(this.mockSpaces);
  }

  // Obtener todas las reservas (para ver la lista)
  getBookings(): Observable<Booking[]> {
    return of(this.mockBookings);
  }

  // --- LÓGICA PRINCIPAL DE CREACIÓN Y VALIDACIÓN ---

  /**
   * Intenta crear una nueva reserva.
   * Valida la disponibilidad antes de agregarla.
   */
  createBooking(newBooking: Omit<Booking, 'id'>): Observable<Booking | null> {
    
    // 1. Validar disponibilidad
    const isAvailable = this.checkAvailability(
      newBooking.spaceId,
      newBooking.startTime,
      newBooking.endTime
    );

    if (!isAvailable) {
      // Si no está disponible, retorna un error (o null/false)
      console.error('Error: El espacio no está disponible en este horario.');
      return throwError(() => new Error('Horario no disponible: Ya existe una reserva conflictiva.'));
    }

    // 2. Si está disponible, la creamos
    const bookingToAdd: Booking = {
      ...newBooking,
      id: `B${this.mockBookings.length + 2}` // Generar un ID simple
    };

    this.mockBookings.push(bookingToAdd);
    console.log('Reserva creada:', bookingToAdd);
    return of(bookingToAdd);
  }

  /**
   * El corazón de la validación: Comprueba si un espacio está libre
   * en un rango de tiempo determinado.
   */
  private checkAvailability(spaceId: string, newStartTime: Date, newEndTime: Date): boolean {
    
    // Obtener todas las reservas *para ese espacio específico*
    const bookingsForSpace = this.mockBookings.filter(
      booking => booking.spaceId === spaceId
    );

    // Comprobar si *alguna* reserva existente (some) tiene conflicto
    const isOverlapping = bookingsForSpace.some(existingBooking => {
      
      const existingStart = existingBooking.startTime;
      const existingEnd = existingBooking.endTime;

      // La lógica de solapamiento (overlap):
      // Un conflicto existe si la nueva reserva empieza *antes* de que la otra termine
      // Y termina *después* de que la otra empiece.
      const overlaps = (newStartTime < existingEnd) && (newEndTime > existingStart);
      
      if(overlaps) {
        console.warn('Conflicto detectado con:', existingBooking);
      }
      
      return overlaps;
    });

    // Si 'isOverlapping' es true, significa que hay un conflicto.
    // Por lo tanto, la disponibilidad es 'false'.
    return !isOverlapping; // Devuelve true si NO hay solapamientos
  }

}
