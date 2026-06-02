import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Employee } from '../../shared/models/models';
import * as EmployeeActions from './employee.actions';

// EntityAdapter helps manage a list of employees by id automatically
export const employeeAdapter = createEntityAdapter<Employee>();

export interface EmployeeState extends EntityState<Employee> {
  selectedId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = employeeAdapter.getInitialState({
  selectedId: null,
  loading: false,
  error: null
});

export const employeeReducer = createReducer(
  initialState,

  // ── Load All ────────────────────────────────────────────────────
  on(EmployeeActions.loadEmployees, state => ({
    ...state, loading: true, error: null
  })),
  on(EmployeeActions.loadEmployeesSuccess, (state, { employees }) =>
    employeeAdapter.setAll(employees, { ...state, loading: false })
  ),
  on(EmployeeActions.loadEmployeesFailure, (state, { error }) => ({
    ...state, loading: false, error
  })),

  // ── Load One ────────────────────────────────────────────────────
  on(EmployeeActions.loadEmployee, state => ({
    ...state, loading: true, error: null
  })),
  on(EmployeeActions.loadEmployeeSuccess, (state, { employee }) =>
    employeeAdapter.upsertOne(employee, { ...state, loading: false })
  ),
  on(EmployeeActions.loadEmployeeFailure, (state, { error }) => ({
    ...state, loading: false, error
  })),

  // ── Create ──────────────────────────────────────────────────────
  on(EmployeeActions.createEmployee, state => ({
    ...state, loading: true, error: null
  })),
  on(EmployeeActions.createEmployeeSuccess, (state, { employee }) =>
    employeeAdapter.addOne(employee, { ...state, loading: false })
  ),
  on(EmployeeActions.createEmployeeFailure, (state, { error }) => ({
    ...state, loading: false, error
  })),

  // ── Update ──────────────────────────────────────────────────────
  on(EmployeeActions.updateEmployee, state => ({
    ...state, loading: true, error: null
  })),
  on(EmployeeActions.updateEmployeeSuccess, (state, { employee }) =>
    employeeAdapter.upsertOne(employee, { ...state, loading: false })
  ),
  on(EmployeeActions.updateEmployeeFailure, (state, { error }) => ({
    ...state, loading: false, error
  })),

  // ── Patch Status ────────────────────────────────────────────────
  on(EmployeeActions.patchEmployeeStatusSuccess, (state, { employee }) =>
    employeeAdapter.upsertOne(employee, state)
  ),

  // ── Delete ──────────────────────────────────────────────────────
  on(EmployeeActions.deleteEmployee, state => ({
    ...state, loading: true
  })),
  on(EmployeeActions.deleteEmployeeSuccess, (state, { id }) =>
    employeeAdapter.removeOne(id, { ...state, loading: false })
  ),
  on(EmployeeActions.deleteEmployeeFailure, (state, { error }) => ({
    ...state, loading: false, error
  })),

  // ── Select ──────────────────────────────────────────────────────
  on(EmployeeActions.selectEmployee, (state, { id }) => ({
    ...state, selectedId: id
  }))
);
