import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api'; // El puerto por defecto de Spring Boot es 8080

  constructor(private http: HttpClient) { }

  public getSpaces(): Observable<any> {
    return this.http.get(`${this.apiUrl}/spaces`);
  }
}