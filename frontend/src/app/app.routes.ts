import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing';
import { Rooms } from './pages/rooms/rooms';

export const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'rooms/:id', component: Rooms }, // 👈 Ruta dinámica para los rooms
  { path: '**', redirectTo: '' } // Redirige rutas inválidas al inicio
];
