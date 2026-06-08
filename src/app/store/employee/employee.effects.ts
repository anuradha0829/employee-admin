import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { EmployeeService } from '../../core/services/employee.service';
import * as EmployeeActions from './employee.actions';

@Injectable()
export class EmployeeEffects {

  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  // When loadEmployees fires → call API → dispatch success or failure
  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployees), // filters action in an effect so it only runs for specific action types 
      switchMap(({ filter }) =>
        this.employeeService.getAll(filter ?? {}).pipe(
          map(employees => EmployeeActions.loadEmployeesSuccess({ employees })),
          catchError(error => of(EmployeeActions.loadEmployeesFailure({ error: error.detail ?? 'Failed to load employees' })))
        )
      )
    )
  );

  loadEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployee),
      switchMap(({ id }) =>
        this.employeeService.getById(id).pipe(
          map(employee => EmployeeActions.loadEmployeeSuccess({ employee })),
          catchError(error => of(EmployeeActions.loadEmployeeFailure({ error: error.detail ?? 'Employee not found' })))
        )
      )
    )
  );

  createEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.createEmployee),
      switchMap(({ dto }) =>
        this.employeeService.create(dto).pipe(
          map(employee => EmployeeActions.createEmployeeSuccess({ employee })),
          catchError(error => of(EmployeeActions.createEmployeeFailure({ error: error.detail ?? 'Failed to create employee' })))
        )
      )
    )
  );

  // After successful create → navigate to the new employee detail
  createEmployeeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.createEmployeeSuccess),
      tap(({ employee }) => this.router.navigate(['/employees', employee.id]))
    ),
    { dispatch: false }
  );

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.updateEmployee),
      switchMap(({ employee }) =>
        this.employeeService.update(employee.id, employee).pipe(
          map(updated => EmployeeActions.updateEmployeeSuccess({ employee: updated })),
          catchError(error => of(EmployeeActions.updateEmployeeFailure({ error: error.detail ?? 'Failed to update employee' })))
        )
      )
    )
  );

  updateEmployeeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.updateEmployeeSuccess),
      tap(({ employee }) => this.router.navigate(['/employees', employee.id]))
    ),
    { dispatch: false }
  );

  patchStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.patchEmployeeStatus),
      switchMap(({ id, status }) =>
        this.employeeService.patchStatus(id, status).pipe(
          map(employee => EmployeeActions.patchEmployeeStatusSuccess({ employee })),
          catchError(error => of(EmployeeActions.loadEmployeesFailure({ error: error.detail ?? 'Failed to update status' })))
        )
      )
    )
  );

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.deleteEmployee),
      switchMap(({ id }) =>
        this.employeeService.delete(id).pipe(
          map(() => EmployeeActions.deleteEmployeeSuccess({ id })),
          catchError(error => of(EmployeeActions.deleteEmployeeFailure({ error: error.detail ?? 'Failed to delete employee' })))
        )
      )
    )
  );

  // After delete → go back to list
  deleteEmployeeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.deleteEmployeeSuccess),
      tap(() => this.router.navigate(['/employees']))
    ),
    { dispatch: false }
  );
}
