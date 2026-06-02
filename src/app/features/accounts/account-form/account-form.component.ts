import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createAccount } from '../../../store/account/account.actions';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-form.component.html',
  styleUrl:    './account-form.component.scss'
})
export class AccountFormComponent {
  @Input()  employeeId = '';          // passed down from AccountList (grandparent: EmployeeDetail)
  @Output() saved = new EventEmitter<void>();  // tells AccountList we are done

  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      accountNumber: ['', [Validators.required, Validators.minLength(16)]],
      accountType:   ['', Validators.required],
      currency:      ['CAD'],
      balance:       [0, [Validators.required, Validators.min(0)]]
    });
  }

  isInvalid(field: string, error: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.touched && ctrl.errors?.[error]);
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.store.dispatch(createAccount({
      dto: { ...this.form.value, employeeId: this.employeeId, status: 'OPEN' }
    }));
    this.form.reset({ currency: 'CAD', balance: 0 });
    this.saved.emit();
  }
}
