// src/app/services/auth0.service.ts
import { Injectable } from '@angular/core';
import { AuthService as Auth0AngularService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth0Service {
  constructor(private auth: Auth0AngularService) {}

  /**
   * Abre el login y manda una ruta destino que podrá usarse después del login.
   * redirectPath: ejemplo '/rooms/1' o '/' por defecto.
   */
  login(redirectPath: string = '/') {
    this.auth.loginWithRedirect({
      appState: { target: redirectPath }
    });
  }

  /**
   * Abre la pantalla de signup (hint) y manda la ruta destino.
   * Si la versión del SDK no acepta screen_hint, puedes quitarla;
   * normalmente funciona en la mayoría de integraciones.
   */
  signup(redirectPath: string = '/') {
    this.auth.loginWithRedirect({
      screen_hint: 'signup',
      appState: { target: redirectPath }
    } as any); // 'as any' por si la definición de tipos no incluye screen_hint en tu versión
  }

  /**
   * Logout: usar logoutParams.returnTo para evitar el error de tipos
   */
  logout() {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }

  /**
   * Observable que indica si el usuario está autenticado
   */
  isAuthenticated$(): Observable<boolean> {
    return this.auth.isAuthenticated$;
  }

  /**
   * Observable con el perfil del usuario (o null)
   */
  user$(): Observable<any> {
    return this.auth.user$;
  }
}
