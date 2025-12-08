// frontend/src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth0: Auth0Service) {}

  // login y enviar ruta destino mediante appState
  login(redirectPath: string = '/') {
    // casteamos a any para evitar errores de tipos con RedirectLoginOptions
    this.auth0.loginWithRedirect({
      appState: { target: redirectPath }
    } as any);
  }

  // signup (pantalla de registro de Auth0)
  signup(redirectPath: string = '/') {
    // screen_hint no está tipado en algunos tipos, casteamos a any
    this.auth0.loginWithRedirect({
      screen_hint: 'signup',
      appState: { target: redirectPath }
    } as any);
  }

  logout() {
    this.auth0.logout({ logoutParams: { returnTo: window.location.origin } } as any);
  }

  isAuthenticated$(): Observable<boolean> {
    return this.auth0.isAuthenticated$;
  }

  user$(): Observable<any> {
    return this.auth0.user$;
  }
}
