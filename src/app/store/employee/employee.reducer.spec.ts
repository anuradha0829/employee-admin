import { employeeReducer, EmployeeState, employeeAdapter } from './employee.reducer';
import * as EmployeeActions from './employee.actions';
import { Employee } from '../../shared/models/models';

// Helper to get a blank initial state
const initialState: EmployeeState = employeeAdapter.getInitialState({
  selectedId: null,
  loading: false,
  error: null
});

const mockEmployee: Employee = {
  id: 'emp-001',
  firstName: 'Alice',
  lastName:  'Johnson',
  email:     'alice@bank.com',
  role:      'ADMIN',
  status:    'ACTIVE'
};

describe('Employee Reducer', () => {

  it('should return the initial state by default', () => {
    const state = employeeReducer(undefined, { type: '@@INIT' } as any);
    expect(state.loading).toBeFalse();
    expect(state.error).toBeNull();
    expect(state.ids.length).toBe(0);
  });

  it('should set loading=true on loadEmployees', () => {
    const state = employeeReducer(initialState, EmployeeActions.loadEmployees({ filter: {} }));
    expect(state.loading).toBeTrue();
  });

  it('should populate employees on loadEmployeesSuccess', () => {
    const state = employeeReducer(
      initialState,
      EmployeeActions.loadEmployeesSuccess({ employees: [mockEmployee] })
    );
    expect(state.ids.length).toBe(1);
    expect(state.entities['emp-001']?.firstName).toBe('Alice');
    expect(state.loading).toBeFalse();
  });

  it('should set error on loadEmployeesFailure', () => {
    const state = employeeReducer(
      initialState,
      EmployeeActions.loadEmployeesFailure({ error: 'Network error' })
    );
    expect(state.error).toBe('Network error');
    expect(state.loading).toBeFalse();
  });

  it('should add employee on createEmployeeSuccess', () => {
    const state = employeeReducer(
      initialState,
      EmployeeActions.createEmployeeSuccess({ employee: mockEmployee })
    );
    expect(state.ids).toContain('emp-001');
  });

  it('should remove employee on deleteEmployeeSuccess', () => {
    const loaded = employeeReducer(
      initialState,
      EmployeeActions.loadEmployeesSuccess({ employees: [mockEmployee] })
    );
    const state = employeeReducer(loaded, EmployeeActions.deleteEmployeeSuccess({ id: 'emp-001' }));
    expect(state.ids).not.toContain('emp-001');
  });

  it('should set selectedId on selectEmployee', () => {
    const state = employeeReducer(initialState, EmployeeActions.selectEmployee({ id: 'emp-001' }));
    expect(state.selectedId).toBe('emp-001');
  });
});
