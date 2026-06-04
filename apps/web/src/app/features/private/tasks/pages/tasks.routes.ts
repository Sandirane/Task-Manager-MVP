import { Routes } from '@angular/router';

export const TASKS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./tasks-list/tasks-list').then((m) => m.TasksList),
  },
  {
    path: 'new',
    loadComponent: () => import('./task-form/task-form').then((m) => m.TaskForm),
  },
  {
    path: ':id',
    loadComponent: () => import('./task-detail/task-detail').then((m) => m.TaskDetail),
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./task-form/task-form').then((m) => m.TaskForm),
  },
];
