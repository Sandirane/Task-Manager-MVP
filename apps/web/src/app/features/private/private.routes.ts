import { Routes } from '@angular/router';

export const PRIVATE_ROUTES: Routes = [
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/pages/tasks.routes').then((m) => m.TASKS_ROUTES),
  },

  {
    path: 'profile',
    loadComponent: () => import('./profile/profile').then((m) => m.Profile),
  },/*
  {
    path: 'admin',
    loadChildren: () => import('./admin/profile.routes').then((m) => m.ADMIN_ROUTES),
  },*/
];
