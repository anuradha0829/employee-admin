import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeState, employeeAdapter } from './employee.reducer';

// Point to the 'employees' slice in the store
const selectEmployeeState = createFeatureSelector<EmployeeState>('employees');

// Entity adapter gives us selectAll, selectEntities, selectIds for free
const { selectAll, selectEntities } = employeeAdapter.getSelectors();

export const selectAllEmployees   = createSelector(selectEmployeeState, selectAll);
export const selectEmployeeMap    = createSelector(selectEmployeeState, selectEntities);
export const selectEmployeeLoading = createSelector(selectEmployeeState, s => s.loading);
export const selectEmployeeError  = createSelector(selectEmployeeState, s => s.error);
export const selectSelectedId     = createSelector(selectEmployeeState, s => s.selectedId);

// Get the currently selected employee object
export const selectSelectedEmployee = createSelector(
  selectEmployeeMap,
  selectSelectedId,
  (entities, id) => (id ? entities[id] : null)
);
