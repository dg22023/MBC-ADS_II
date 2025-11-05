import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Reserve } from './pages/reserve/reserve';
import { Login } from './pages/login/login';

const routes: Routes = [
  { path: '', component: Landing },
  { path: 'reserve/:id', component: Reserve },
  { path: 'login', component: Login },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
