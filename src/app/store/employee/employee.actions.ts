import { createAction, props } from '@ngrx/store';
import { Employee, CreateEmployeeDto, EmployeeFilter } from '../../shared/models/models';

// ── Load All ──────────────────────────────────────────────────────
export const loadEmployees = createAction(
  '[Employee List] Load Employees',
  props<{ filter?: EmployeeFilter }>()
);
export const loadEmployeesSuccess = createAction(
  '[Employee API] Load Employees Success',
  props<{ employees: Employee[] }>()
);
export const loadEmployeesFailure = createAction(
  '[Employee API] Load Employees Failure',
  props<{ error: string }>()
);

// ── Load One ──────────────────────────────────────────────────────
export const loadEmployee = createAction(
  '[Employee Detail] Load Employee',
  props<{ id: string }>()
);
export const loadEmployeeSuccess = createAction(
  '[Employee API] Load Employee Success',
  props<{ employee: Employee }>()
);
export const loadEmployeeFailure = createAction(
  '[Employee API] Load Employee Failure',
  props<{ error: string }>()
);

// ── Create ────────────────────────────────────────────────────────
export const createEmployee = createAction(
  '[Employee Form] Create Employee',
  props<{ dto: CreateEmployeeDto }>()
);
export const createEmployeeSuccess = createAction(
  '[Employee API] Create Employee Success',
  props<{ employee: Employee }>()
);
export const createEmployeeFailure = createAction(
  '[Employee API] Create Employee Failure',
  props<{ error: string }>()
);

// ── Update ────────────────────────────────────────────────────────
export const updateEmployee = createAction(
  '[Employee Form] Update Employee',
  props<{ employee: Employee }>()
);
export const updateEmployeeSuccess = createAction(
  '[Employee API] Update Employee Success',
  props<{ employee: Employee }>()
);
export const updateEmployeeFailure = createAction(
  '[Employee API] Update Employee Failure',
  props<{ error: string }>()
);

// ── Patch Status ──────────────────────────────────────────────────
export const patchEmployeeStatus = createAction(
  '[Employee List] Patch Status',
  props<{ id: string; status: 'ACTIVE' | 'INACTIVE' }>()
);
export const patchEmployeeStatusSuccess = createAction(
  '[Employee API] Patch Status Success',
  props<{ employee: Employee }>()
);

// ── Delete ────────────────────────────────────────────────────────
export const deleteEmployee = createAction(
  '[Employee Detail] Delete Employee',
  props<{ id: string }>()
);
export const deleteEmployeeSuccess = createAction(
  '[Employee API] Delete Employee Success',
  props<{ id: string }>()
);
export const deleteEmployeeFailure = createAction(
  '[Employee API] Delete Employee Failure',
  props<{ error: string }>()
);

// ── Select ────────────────────────────────────────────────────────
export const selectEmployee = createAction(
  '[Employee] Select Employee',
  props<{ id: string | null }>()
);
