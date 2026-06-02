import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Account } from '../../../shared/models/models';
import { loadAccounts, closeAccount, deleteAccount } from '../../../store/account/account.actions';
import { selectAllAccounts, selectAccountLoading, selectTotalBalance } from '../../../store/account/account.selectors';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { AccountFormComponent } from '../account-form/account-form.component';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent, ConfirmDialogComponent, AccountFormComponent],
  templateUrl: './account-list.component.html',
  styleUrl:    './account-list.component.scss'
})
export class AccountListComponent implements OnInit, OnChanges {
  @Input() employeeId = '';  // received from parent EmployeeDetail via @Input()

  accounts$:     Observable<Account[]>;
  loading$:      Observable<boolean>;
  totalBalance$: Observable<number>;

  showAddForm       = false;
  showCloseConfirm  = false;
  showDeleteConfirm = false;
  selectedAccount: Account | null = null;

  constructor(private store: Store) {
    this.accounts$     = this.store.select(selectAllAccounts);
    this.loading$      = this.store.select(selectAccountLoading);
    this.totalBalance$ = this.store.select(selectTotalBalance);
  }

  ngOnInit(): void    { this.loadAccounts(); }
  ngOnChanges(): void { this.loadAccounts(); }

  loadAccounts(): void {
    if (this.employeeId) this.store.dispatch(loadAccounts({ employeeId: this.employeeId }));
  }

  onSaved(): void { this.showAddForm = false; }

  confirmClose(acc: Account): void  { this.selectedAccount = acc; this.showCloseConfirm = true; }
  doClose(): void {
    if (this.selectedAccount) this.store.dispatch(closeAccount({ id: this.selectedAccount.id }));
    this.showCloseConfirm = false;
  }

  confirmRemove(acc: Account): void { this.selectedAccount = acc; this.showDeleteConfirm = true; }
  doDelete(): void {
    if (this.selectedAccount) this.store.dispatch(deleteAccount({ id: this.selectedAccount.id }));
    this.showDeleteConfirm = false;
  }
}
