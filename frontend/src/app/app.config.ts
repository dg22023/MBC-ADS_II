import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { environment } from './environments/environment';

// Importaciones para Auth0
import { provideAuth0 } from '@auth0/auth0-angular';

// Importaciones necesarias para Material
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    // Configuración del proveedor de Auth0
    provideAuth0({
      ...environment.auth,
    }),
    provideAnimations(),
    provideNativeDateAdapter()
  ]
};
