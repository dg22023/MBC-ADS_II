import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing';

export const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: '**', redirectTo: '' } // redirige cualquier ruta inválida al inicio
];
