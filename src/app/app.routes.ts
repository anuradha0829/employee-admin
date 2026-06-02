import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  {
    // Lazy-load the employees feature — the entire feature module loads on demand
    path: 'employees',
    loadChildren: () =>
      import('./features/employees/employee.routes').then(m => m.EMPLOYEE_ROUTES)
  },
  { path: '**', redirectTo: 'employees' }
];
