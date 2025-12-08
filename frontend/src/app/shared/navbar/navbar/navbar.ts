// src/app/shared/navbar/navbar/navbar.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service'; // <-- ruta relativa desde navbar/navbar

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  isAuthenticated$!: Observable<boolean>;
  user$!: Observable<any>;

  constructor(public auth: AuthService) {
    // Asignar observables en el constructor para evitar "used before initialization"
    this.isAuthenticated$ = this.auth.isAuthenticated$();
    this.user$ = this.auth.user$();
  }

  login() {
    // mantiene pathname para volver
    this.auth.login(window.location.pathname || '/');
  }

  signup() {
    this.auth.signup(window.location.pathname || '/');
  }

  logout() {
    this.auth.logout();
  }
}
