import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountState, accountAdapter } from './account.reducer';

const selectAccountState = createFeatureSelector<AccountState>('accounts');

const { selectAll } = accountAdapter.getSelectors();

export const selectAllAccounts    = createSelector(selectAccountState, selectAll);
export const selectAccountLoading = createSelector(selectAccountState, s => s.loading);
export const selectAccountError   = createSelector(selectAccountState, s => s.error);

// Sum of balances for all loaded accounts (used for total display)
export const selectTotalBalance = createSelector(
  selectAllAccounts,
  accounts => accounts.reduce((sum, a) => sum + a.balance, 0)
);
