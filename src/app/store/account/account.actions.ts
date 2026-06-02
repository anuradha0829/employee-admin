import { createAction, props } from '@ngrx/store';
import { Account, CreateAccountDto } from '../../shared/models/models';

export const loadAccounts = createAction(
  '[Account List] Load Accounts',
  props<{ employeeId: string }>()
);
export const loadAccountsSuccess = createAction(
  '[Account API] Load Accounts Success',
  props<{ accounts: Account[] }>()
);
export const loadAccountsFailure = createAction(
  '[Account API] Load Accounts Failure',
  props<{ error: string }>()
);

export const createAccount = createAction(
  '[Account Form] Create Account',
  props<{ dto: CreateAccountDto }>()
);
export const createAccountSuccess = createAction(
  '[Account API] Create Account Success',
  props<{ account: Account }>()
);
export const createAccountFailure = createAction(
  '[Account API] Create Account Failure',
  props<{ error: string }>()
);

export const updateAccount = createAction(
  '[Account Form] Update Account',
  props<{ account: Account }>()
);
export const updateAccountSuccess = createAction(
  '[Account API] Update Account Success',
  props<{ account: Account }>()
);
export const updateAccountFailure = createAction(
  '[Account API] Update Account Failure',
  props<{ error: string }>()
);

export const closeAccount = createAction(
  '[Account List] Close Account',
  props<{ id: string }>()
);
export const closeAccountSuccess = createAction(
  '[Account API] Close Account Success',
  props<{ account: Account }>()
);

export const deleteAccount = createAction(
  '[Account List] Delete Account',
  props<{ id: string }>()
);
export const deleteAccountSuccess = createAction(
  '[Account API] Delete Account Success',
  props<{ id: string }>()
);
export const deleteAccountFailure = createAction(
  '[Account API] Delete Account Failure',
  props<{ error: string }>()
);
