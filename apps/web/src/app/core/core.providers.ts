import { ApplicationConfig, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from '../app.routes';
import { authInterceptor } from './auth/auth-interceptor';
import { initializeKeycloak } from './auth/keycloak.config';

export const coreProviders: ApplicationConfig['providers'] = [
  provideBrowserGlobalErrorListeners(),
  provideRouter(routes),
  provideAppInitializer(() => initializeKeycloak()),
  provideHttpClient(withInterceptors([authInterceptor])),
];
