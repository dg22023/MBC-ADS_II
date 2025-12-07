// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { LayoutComponent } from './components/layout/layout';
import { LandingComponent } from './pages/landing/landing';
import { Rooms } from './pages/rooms/rooms';
import { SpacesComponent } from './pages/spaces/spaces';
import { AboutComponent } from './pages/about/about';
import { ContactComponent } from './pages/contact/contact';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'spaces', component: SpacesComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'rooms/:id', component: Rooms }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
