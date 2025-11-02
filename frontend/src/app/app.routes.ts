import { Routes } from '@angular/router';
import { MyReservations as MyReservationsComponent } from './pages/my-reservations/my-reservations';

export const routes: Routes = [
    { path: 'my-reservations', component: MyReservationsComponent },
    { path: '/', redirectTo: 'my-reservations'}
];
