// src/app/app.ts
import { Component, OnInit } from '@angular/core'; // Import OnInit
import { RouterModule, Router } from '@angular/router';
import { routes } from './app.routes';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs'; // Import Observable

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit { // Implement OnInit
  title = 'mbc-adsii-front';

  isLoggedIn$!: Observable<boolean>; // Declare without immediate initialization

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void { // Initialize in ngOnInit
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
