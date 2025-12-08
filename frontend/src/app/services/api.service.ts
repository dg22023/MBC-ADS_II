import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = environment.apiUrl; // URL BASE DE LA API

  constructor(private http: HttpClient) { }

  API_ENDPOINTS = {
    authentication: {
      login: `${this.apiUrl}/auth/login`,
      register: `${this.apiUrl}/auth/register`,
      //AGREGAR RUTAS DE VER Y EDITAR INFORMACION
      edit: `${this.apiUrl}/auth/edit`,
      get: `${this.apiUrl}/auth/get`,
      getUserByAuth0Id: (auth0Id: string) => `${this.apiUrl}/users/auth0/${auth0Id}`,
    },
    users: {
    getAll: `${this.apiUrl}/users`,
    getById: (id: number) => `${this.apiUrl}/users/${id}`,
    create: `${this.apiUrl}/users`,
    update: (id: number) => `${this.apiUrl}/users/${id}`,
    delete: (id: number) => `${this.apiUrl}/users/${id}`
  },
    spaces: {
      getAll: `${this.apiUrl}/spaces`,
      getById: (id: number) => `${this.apiUrl}/spaces/${id}`,
      create: `${this.apiUrl}/spaces`,
      update: (id: number) => `${this.apiUrl}/spaces/${id}`,
      delete: (id: number) => `${this.apiUrl}/spaces/${id}`,
      getSpaces: `${this.apiUrl}/spaces`,
    }
  };

}