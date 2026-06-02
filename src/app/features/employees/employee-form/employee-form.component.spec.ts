import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { EmployeeFormComponent } from './employee-form.component';
import { EmployeeService } from '../../../core/services/employee.service';

describe('EmployeeFormComponent', () => {
  let fixture: ComponentFixture<EmployeeFormComponent>;
  let component: EmployeeFormComponent;
  let store: MockStore;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('EmployeeService', ['checkEmailExists']);
    serviceSpy.checkEmailExists.and.returnValue(of([])); // email is unique by default

    await TestBed.configureTestingModule({
      imports: [EmployeeFormComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [
        provideMockStore({ initialState: { employees: { ids: [], entities: {}, loading: false, error: null, selectedId: null } } }),
        { provide: EmployeeService, useValue: serviceSpy }
      ]
    }).compileComponents();

    fixture   = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    store     = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when form is empty', () => {
    expect(component.form.invalid).toBeTrue();
  });

  it('should require firstName', () => {
    component.form.get('firstName')?.setValue('');
    component.form.get('firstName')?.markAsTouched();
    expect(component.isInvalid('firstName', 'required')).toBeTrue();
  });

  it('should validate email format', () => {
    component.form.get('email')?.setValue('not-an-email');
    component.form.get('email')?.markAsTouched();
    expect(component.isInvalid('email', 'email')).toBeTrue();
  });

  it('should be valid when all fields are filled correctly', async () => {
    component.form.setValue({
      firstName: 'Alice',
      lastName:  'Smith',
      email:     'alice@bank.com',
      role:      'ADMIN',
      status:    'ACTIVE'
    });
    // Wait for async email validator to complete
    await fixture.whenStable();
    expect(component.form.get('firstName')?.valid).toBeTrue();
    expect(component.form.get('email')?.errors?.['email']).toBeFalsy();
  });
});
