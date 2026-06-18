import { Routes } from '@angular/router';
import { adminGuard } from '@core/guards/admin-guard';

export const PRIVATE_ROUTES: Routes = [
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/pages/tasks.routes').then((m) => m.TASKS_ROUTES),
  },

  {
    path: 'profile',
    loadComponent: () => import('./profile/profile').then((m) => m.Profile),
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () => import('./admin/pages/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: 'assistant',
    loadComponent: () => import('./ai/pages/ai-dashboard/ai-dashboard').then((m) => m.AiDashboard),
  },
];
