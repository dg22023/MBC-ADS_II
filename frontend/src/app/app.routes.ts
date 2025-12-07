
import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing';
import { Rooms } from './pages/rooms/rooms';
import { LoginComponent } from './components/auth/login.component'; // Import Login Component
import { RegisterComponent } from './components/auth/register.component'; // Import Register Component
import { AuthGuard } from './services/auth.guard'; // Import AuthGuard

export const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent }, // Added login route
  { path: 'register', component: RegisterComponent }, // Added register route
  { path: 'rooms/:id', component: Rooms, canActivate: [AuthGuard] }, // Protected rooms route
  { path: '**', redirectTo: '' } // Redirige rutas inválidas al inicio
];
