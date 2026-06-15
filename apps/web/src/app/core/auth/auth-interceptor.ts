import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth-service';
import { from, switchMap } from 'rxjs';
import { keycloak } from './keycloak.config';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return from(keycloak.updateToken(30)).pipe(
    switchMap(() => {
      const token = authService.getToken();

      if (!token) {
        return next(req);
      }

      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next(clonedRequest);
    }),
  );
};
