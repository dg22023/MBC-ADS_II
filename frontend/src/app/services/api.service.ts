import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Space } from '../models/booking/booking';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los espacios disponibles
   */
  public getSpaces(): Observable<Space[]> {
    return this.http.get<Space[]>(`${this.apiUrl}/spaces/all`);
  }

  /**
   * Obtiene espacios disponibles para un rango de tiempo
   */
  public getAvailableSpaces(startTime: string, endTime: string): Observable<Space[]> {
    return this.http.get<Space[]>(`${this.apiUrl}/spaces/available`, {
      params: { startTime, endTime }
    });
  }
}