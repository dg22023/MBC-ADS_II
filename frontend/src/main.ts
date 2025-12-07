// src/main.ts
import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@auth0/auth0-angular';

import { App } from './app/app';
import { routes } from './app/app.routes';
import { environment } from './app/environments/environment';


bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(
      AuthModule.forRoot({
        domain: environment.auth.domain,
        clientId: environment.auth.clientId,
        authorizationParams: {
          audience: environment.auth.authorizationParams.audience,
          redirect_uri: environment.auth.authorizationParams.redirect_uri
        },
        cacheLocation: 'localstorage',
        useRefreshTokens: true
      })
    )
  ]
}).catch(err => console.error(err));
