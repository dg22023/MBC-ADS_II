import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Login } from './pages/login/login';
import { Reserve } from './pages/reserve/reserve';

export const routes: Routes = [
	{ path: '', component: Landing },
	{ path: 'login', component: Login },
	{ path: 'reserve/:id', component: Reserve },
	{ path: '**', redirectTo: '' }
];
