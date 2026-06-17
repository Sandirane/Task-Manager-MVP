import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/auth-guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./features/public/home/home').then((m) => m.Home),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () => import('./features/private/private.routes').then((m) => m.PRIVATE_ROUTES),
  },
  {
    path: 'ai',
    loadComponent: () =>
      import('./features/private/ai/pages/ai-dashboard/ai-dashboard').then((m) => m.AiDashboard),
  },

  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./features/public/unauthorized/unauthorized').then((m) => m.Unauthorized),
  },

  {
    path: 'not-authorized',
    loadComponent: () =>
      import('./features/public/not-authorized/not-authorized').then((m) => m.NotAuthorized),
  },

  {
    path: '**',
    loadComponent: () =>
      import('./features/public/page-not-found/page-not-found').then((m) => m.PageNotFound),
  },
];
