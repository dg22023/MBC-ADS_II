import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api/v1'; // El puerto por defecto de Spring Boot es 8080

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Asume que el token se guarda en localStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  public getSpaces(): Observable<any> {
    return this.http.get(`${this.apiUrl}/spaces`, { headers: this.getAuthHeaders() });
  }

  public getMyActiveReservations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reservations/my-active`, { headers: this.getAuthHeaders() });
  }

  public updateReservation(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/reservations/${id}`, data, { headers: this.getAuthHeaders() });
  }

  public cancelReservation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reservations/${id}`, { headers: this.getAuthHeaders() });
  }
}