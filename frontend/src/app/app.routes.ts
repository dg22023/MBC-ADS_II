import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing';
import { Rooms } from './pages/rooms/rooms';
import { RoleGuard } from './auth/role.guard';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { 
    path: 'rooms/:id', 
    component: Rooms,
    canActivate: [RoleGuard] // 👈 Protege esta ruta
  },
  { path: '**', redirectTo: '' } // Redirige rutas inválidas al inicio
];
