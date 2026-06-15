import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth-service';
import { AlertService } from '@core/services/alert.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const alert = inject(AlertService);
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 0) {
        alert.show('Serveur indisponible', 'danger');
        return throwError(() => error);
      }

      if (error.status === 401) {
        alert.show('Session expirée', 'warning');
        authService.logout().then(() => {
          router.navigate(['/unauthorized']);
        });

        return throwError(() => error);
      }

      if (error.status === 403) {
        alert.show(error.error?.message ?? 'Accès refusé', 'danger');
        router.navigate(['/not-authorized']);
      }

      if (error.status === 404) {
        alert.show(error.error?.message ?? 'Ressource introuvable', 'warning');
      }

      if (error.status >= 500) {
        alert.show(error.error?.message ?? 'Erreur serveur', 'danger');
      }

      return throwError(() => error);
    }),
  );
};
