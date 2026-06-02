import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';

import { EmployeeEffects } from './employee.effects';
import { EmployeeService } from '../../core/services/employee.service';
import * as EmployeeActions from './employee.actions';
import { Employee } from '../../shared/models/models';
import { Router } from '@angular/router';

const mockEmployee: Employee = {
  id: 'emp-001', firstName: 'Alice', lastName: 'Johnson',
  email: 'alice@bank.com', role: 'ADMIN', status: 'ACTIVE'
};

describe('EmployeeEffects', () => {
  let actions$: Observable<Action>;
  let effects: EmployeeEffects;
  let employeeService: jasmine.SpyObj<EmployeeService>;

  beforeEach(() => {
    const serviceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'getById', 'create', 'delete']);
    const routerSpy  = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        EmployeeEffects,
        provideMockActions(() => actions$),
        { provide: EmployeeService, useValue: serviceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    effects = TestBed.inject(EmployeeEffects);
    employeeService = TestBed.inject(EmployeeService) as jasmine.SpyObj<EmployeeService>;
  });

  it('should dispatch loadEmployeesSuccess on successful API call', done => {
    employeeService.getAll.and.returnValue(of([mockEmployee]));
    actions$ = of(EmployeeActions.loadEmployees({ filter: {} }));

    effects.loadEmployees$.subscribe(action => {
      expect(action).toEqual(EmployeeActions.loadEmployeesSuccess({ employees: [mockEmployee] }));
      done();
    });
  });

  it('should dispatch loadEmployeesFailure on API error', done => {
    employeeService.getAll.and.returnValue(throwError(() => ({ detail: 'Server error' })));
    actions$ = of(EmployeeActions.loadEmployees({ filter: {} }));

    effects.loadEmployees$.subscribe(action => {
      expect(action.type).toBe('[Employee API] Load Employees Failure');
      done();
    });
  });

  it('should dispatch deleteEmployeeSuccess on successful delete', done => {
    employeeService.delete.and.returnValue(of(void 0));
    actions$ = of(EmployeeActions.deleteEmployee({ id: 'emp-001' }));

    effects.deleteEmployee$.subscribe(action => {
      expect(action).toEqual(EmployeeActions.deleteEmployeeSuccess({ id: 'emp-001' }));
      done();
    });
  });
});
