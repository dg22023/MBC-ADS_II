import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Space, CreateBookingRequest, BookingResponse } from '../../models/booking/booking';

@Injectable({
  providedIn: 'root'
})
export class Bookingservice {
  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los espacios disponibles desde el backend
   */
  getSpaces(): Observable<Space[]> {
    return this.http.get<Space[]>(`${this.apiUrl}/spaces/all`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Obtiene los espacios disponibles para un rango de tiempo específico
   */
  getAvailableSpaces(startTime: Date, endTime: Date): Observable<Space[]> {
    const params = new HttpParams()
      .set('startTime', startTime.toISOString())
      .set('endTime', endTime.toISOString());

    return this.http.get<Space[]>(`${this.apiUrl}/spaces/available`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Crea una nueva reserva en el backend
   */
  createBooking(bookingData: { spaceId: number; userId: number; startTime: Date; endTime: Date }): Observable<BookingResponse> {
    const request: CreateBookingRequest = {
      userId: bookingData.userId,
      spaceId: bookingData.spaceId,
      startTime: bookingData.startTime.toISOString(),
      endTime: bookingData.endTime.toISOString()
    };

    return this.http.post<BookingResponse>(`${this.apiUrl}/reservations`, request)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Manejo centralizado de errores HTTP
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      if (error.status === 409) {
        // Conflicto de reserva
        errorMessage = error.error?.message || 'El espacio ya está reservado para ese horario';
      } else if (error.status === 404) {
        errorMessage = error.error?.message || 'Recurso no encontrado';
      } else if (error.status === 400) {
        errorMessage = error.error?.message || 'Datos de entrada inválidos';
      } else if (error.status === 0) {
        errorMessage = 'No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose.';
      } else {
        errorMessage = error.error?.message || `Error del servidor: ${error.status}`;
      }
    }

    console.error('Error en BookingService:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
