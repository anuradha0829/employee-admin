import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AccountService } from '../../core/services/account.service';
import * as AccountActions from './account.actions';

@Injectable()
export class AccountEffects {

  constructor(
    private actions$: Actions,
    private accountService: AccountService
  ) {}

  loadAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.loadAccounts),
      switchMap(({ employeeId }) =>
        this.accountService.getByEmployee(employeeId).pipe(
          map(accounts => AccountActions.loadAccountsSuccess({ accounts })),
          catchError(err => of(AccountActions.loadAccountsFailure({ error: err.detail ?? 'Failed to load accounts' })))
        )
      )
    )
  );

  createAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.createAccount),
      switchMap(({ dto }) =>
        this.accountService.create(dto).pipe(
          map(account => AccountActions.createAccountSuccess({ account })),
          catchError(err => of(AccountActions.createAccountFailure({ error: err.detail ?? 'Failed to create account' })))
        )
      )
    )
  );

  updateAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.updateAccount),
      switchMap(({ account }) =>
        this.accountService.update(account.id, account).pipe(
          map(updated => AccountActions.updateAccountSuccess({ account: updated })),
          catchError(err => of(AccountActions.updateAccountFailure({ error: err.detail ?? 'Failed to update account' })))
        )
      )
    )
  );

  closeAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.closeAccount),
      switchMap(({ id }) =>
        this.accountService.close(id).pipe(
          map(account => AccountActions.closeAccountSuccess({ account })),
          catchError(err => of(AccountActions.loadAccountsFailure({ error: err.detail ?? 'Failed to close account' })))
        )
      )
    )
  );

  deleteAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.deleteAccount),
      switchMap(({ id }) =>
        this.accountService.delete(id).pipe(
          map(() => AccountActions.deleteAccountSuccess({ id })),
          catchError(err => of(AccountActions.deleteAccountFailure({ error: err.detail ?? 'Failed to delete account' })))
        )
      )
    )
  );
}
