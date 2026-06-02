import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, debounceTime, switchMap, first, catchError } from 'rxjs/operators';

import { Employee } from '../../../shared/models/models';
import { createEmployee, updateEmployee } from '../../../store/employee/employee.actions';
import { selectAllEmployees, selectEmployeeLoading } from '../../../store/employee/employee.selectors';
import { EmployeeService } from '../../../core/services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-form.component.html',
  styleUrl:    './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit {
  form!: FormGroup;
  loading$: Observable<boolean>;
  isEdit = false;
  editId = '';

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {
    this.loading$ = this.store.select(selectEmployeeLoading);
  }

  ngOnInit(): void {
    this.editId = this.route.snapshot.paramMap.get('id') ?? '';
    this.isEdit = !!this.editId;

    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName:  ['', Validators.required],
      email:     ['', [Validators.required, Validators.email], [this.uniqueEmailValidator.bind(this)]],
      role:      ['', Validators.required],
      status:    ['ACTIVE']
    });

    if (this.isEdit) {
      this.store.select(selectAllEmployees).pipe(
        map(emps => emps.find(e => e.id === this.editId)),
        first(e => !!e)
      ).subscribe(emp => {
        if (emp) this.form.patchValue(emp);
      });
    }
  }

  uniqueEmailValidator(originalEmail?: string) {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = control.value?.trim();
      if (!value || value === originalEmail) return of(null);
      return of(value).pipe(
        debounceTime(400),
        switchMap(email =>
          this.employeeService.checkEmailExists(email).pipe(
            map(employees => employees.length > 0 ? { emailTaken: true } : null),
            catchError(() => of(null))
          )
        )
      );
    };
  }

  isInvalid(field: string, error: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.touched && ctrl.errors?.[error]);
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const val = this.form.value;
    if (this.isEdit) {
      this.store.dispatch(updateEmployee({ employee: { ...val, id: this.editId } }));
    } else {
      this.store.dispatch(createEmployee({ dto: val }));
    }
  }
}
