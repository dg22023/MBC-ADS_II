import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';

// Importaciones necesarias para Material
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AuthInterceptor } from './services/auth.interceptor'; // Added import


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideNativeDateAdapter(),

    // New HTTP client and interceptor configuration
    provideHttpClient(withInterceptorsFromDi()), // Added withInterceptorsFromDi()
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, // Added AuthInterceptor
  ]
};
