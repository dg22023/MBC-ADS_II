// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { LandingComponent } from './pages/landing/landing';
import { Rooms } from './pages/rooms/rooms';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },

  { path: 'landing', component: LandingComponent },

  { path: 'login', component: LoginComponent },

  { path: 'rooms/:id', component: Rooms },

  { path: '**', redirectTo: 'landing' }
];
