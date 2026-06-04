import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const alert = inject(AlertService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        alert.show('Authentification requise', 'warning');
        router.navigate(['/unauthorized']);
      } else if (error.status === 403) {
        alert.show(error.error?.message ?? 'Accès refusé', 'danger');
        router.navigate(['/not-authorized']);
      } else if (error.status === 404) {
        alert.show(error.error?.message ?? 'Ressource introuvable', 'warning');
        router.navigate(['/page-not-found']);
      } else if (error.status >= 500) {
        alert.show(error.error?.message ?? 'Erreur serveur', 'danger');
      } else {
        alert.show(error.error?.message ?? 'Erreur inconnue', 'danger');
      }

      return throwError(() => error);
    }),
  );
};
