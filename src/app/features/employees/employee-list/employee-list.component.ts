import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Employee } from '../../../shared/models/models';
import { loadEmployees, deleteEmployee } from '../../../store/employee/employee.actions';
import { selectAllEmployees, selectEmployeeLoading, selectEmployeeError } from '../../../store/employee/employee.selectors';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, StatusBadgeComponent, LoadingSpinnerComponent, ConfirmDialogComponent],
  templateUrl: './employee-list.component.html',
  styleUrl:    './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  employees$: Observable<Employee[]>;
  loading$:   Observable<boolean>;
  error$:     Observable<string | null>;

  searchControl = new FormControl('');
  roleControl   = new FormControl('');
  statusControl = new FormControl('');

  showConfirm  = false;
  selectedEmp: Employee | null = null;

  constructor(private store: Store) {
    this.employees$ = this.store.select(selectAllEmployees);
    this.loading$   = this.store.select(selectEmployeeLoading);
    this.error$     = this.store.select(selectEmployeeError);
  }

  ngOnInit(): void {
    this.load();
    this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(() => this.load());
    this.roleControl.valueChanges.subscribe(() => this.load());
    this.statusControl.valueChanges.subscribe(() => this.load());
  }

  load(): void {
    this.store.dispatch(loadEmployees({
      filter: {
        search: this.searchControl.value ?? '',
        role:   this.roleControl.value   ?? '',
        status: this.statusControl.value ?? ''
      }
    }));
  }

  confirmDelete(emp: Employee): void {
    this.selectedEmp = emp;
    this.showConfirm = true;
  }

  doDelete(): void {
    if (this.selectedEmp) this.store.dispatch(deleteEmployee({ id: this.selectedEmp.id }));
    this.showConfirm = false;
  }
}
