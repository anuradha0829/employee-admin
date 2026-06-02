import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee } from '../../../shared/models/models';
import { loadEmployee, deleteEmployee, selectEmployee } from '../../../store/employee/employee.actions';
import { selectAllEmployees, selectEmployeeLoading } from '../../../store/employee/employee.selectors';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { AccountListComponent } from '../../accounts/account-list/account-list.component';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, StatusBadgeComponent, LoadingSpinnerComponent, ConfirmDialogComponent, AccountListComponent],
  templateUrl: './employee-detail.component.html',
  styleUrl:    './employee-detail.component.scss'
})
export class EmployeeDetailComponent implements OnInit {
  employee$:   Observable<Employee | undefined>;
  loading$:    Observable<boolean>;
  showConfirm  = false;
  employeeId   = '';

  constructor(private store: Store, private route: ActivatedRoute) {
    this.loading$  = this.store.select(selectEmployeeLoading);
    this.employee$ = this.store.select(selectAllEmployees).pipe(
      map(employees => employees.find(e => e.id === this.employeeId))
    );
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') ?? '';
    this.store.dispatch(loadEmployee({ id: this.employeeId }));
    this.store.dispatch(selectEmployee({ id: this.employeeId }));
  }

  doDelete(id: string): void {
    this.store.dispatch(deleteEmployee({ id }));
    this.showConfirm = false;
  }
}
