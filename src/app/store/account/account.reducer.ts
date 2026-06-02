import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Account } from '../../shared/models/models';
import * as AccountActions from './account.actions';

export const accountAdapter = createEntityAdapter<Account>();

export interface AccountState extends EntityState<Account> {
  loading: boolean;
  error: string | null;
}

const initialState: AccountState = accountAdapter.getInitialState({
  loading: false,
  error: null
});

export const accountReducer = createReducer(
  initialState,

  on(AccountActions.loadAccounts, state => ({ ...state, loading: true, error: null })),
  on(AccountActions.loadAccountsSuccess, (state, { accounts }) =>
    accountAdapter.setAll(accounts, { ...state, loading: false })
  ),
  on(AccountActions.loadAccountsFailure, (state, { error }) => ({
    ...state, loading: false, error
  })),

  on(AccountActions.createAccount, state => ({ ...state, loading: true })),
  on(AccountActions.createAccountSuccess, (state, { account }) =>
    accountAdapter.addOne(account, { ...state, loading: false })
  ),
  on(AccountActions.createAccountFailure, (state, { error }) => ({
    ...state, loading: false, error
  })),

  on(AccountActions.updateAccountSuccess, (state, { account }) =>
    accountAdapter.upsertOne(account, state)
  ),

  on(AccountActions.closeAccountSuccess, (state, { account }) =>
    accountAdapter.upsertOne(account, state)
  ),

  on(AccountActions.deleteAccountSuccess, (state, { id }) =>
    accountAdapter.removeOne(id, state)
  )
);
