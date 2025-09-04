import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'signal-forms',
    loadComponent: () => import('./employee-form/employee-form'),
  },
];
