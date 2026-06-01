import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./features/public/home/home').then((m) => m.Home),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
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
