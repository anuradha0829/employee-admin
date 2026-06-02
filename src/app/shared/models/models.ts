// ─── Employee ────────────────────────────────────────────────────
export type EmployeeRole   = 'ADMIN' | 'MANAGER' | 'SUPPORT';
export type EmployeeStatus = 'ACTIVE' | 'INACTIVE';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: EmployeeRole;
  status: EmployeeStatus;
  createdAt?: string;
  updatedAt?: string;
}

// Used when creating – no id yet
export type CreateEmployeeDto = Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>;

// ─── Account ─────────────────────────────────────────────────────
export type AccountType     = 'CHECKING' | 'SAVINGS';
export type AccountCurrency = 'CAD' | 'USD';
export type AccountStatus   = 'OPEN' | 'CLOSED';

export interface Account {
  id: string;
  employeeId: string;
  accountNumber: string;   // stored full, shown masked in UI
  accountType: AccountType;
  currency: AccountCurrency;
  balance: number;
  status: AccountStatus;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateAccountDto = Omit<Account, 'id' | 'createdAt' | 'updatedAt'>;

// ─── API helpers ─────────────────────────────────────────────────
export interface ApiError {
  type: string;
  title: string;
  status: number;
  detail: string;
}

export interface EmployeeFilter {
  search?: string;
  role?: string;
  status?: string;
}
