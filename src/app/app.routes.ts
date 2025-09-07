import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'employee-form',
    loadComponent: () => import('./employee-form/employee-form'),
  },
  {
    path: 'employee-posts',
    loadComponent: () => import('./employee-posts/employee-posts'),
  },
];
