import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from '../app.routes';

import { authInterceptor } from './auth/auth-interceptor';
import { initializeKeycloak } from './auth/keycloak.config';
import { errorInterceptor } from './interceptors/error-interceptor-interceptor';
import { loadingInterceptor } from './interceptors/loading-interceptor-interceptor';

export const coreProviders: ApplicationConfig['providers'] = [
  provideBrowserGlobalErrorListeners(),
  provideRouter(routes, withComponentInputBinding()),
  provideAppInitializer(() => initializeKeycloak()),
  provideHttpClient(
    withInterceptors([
      authInterceptor, 
      loadingInterceptor, 
      errorInterceptor
    ])),
];
