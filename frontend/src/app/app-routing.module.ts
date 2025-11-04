import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ReserveComponent } from './pages/reserve/reserve.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'reserve/:id', component: ReserveComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
