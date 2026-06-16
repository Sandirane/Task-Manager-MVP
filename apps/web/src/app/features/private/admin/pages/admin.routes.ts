import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin-dashboard/admin-dashboard').then((m) => m.AdminDashboard),
  },
  {
    path: 'tasks',
    loadComponent: () => import('./admin-tasks/admin-tasks').then((m) => m.AdminTasks),
  },
  {
    path: 'users',
    loadComponent: () => import('./admin-users/admin-users').then((m) => m.AdminUsers),
  },
];
