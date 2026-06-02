# 🏦 Employee Admin Portal

A Banking Admin Portal built with Angular 17+, NgRx, and a json-server mock backend.

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 18+ |
| npm | 9+ |
| Angular CLI | 17+ (`npm install -g @angular/cli`) |

---

## How to Run

### 1. Install dependencies
```bash
npm install
```

### 2. Start both servers together (recommended)
```bash
npm run dev
```
This starts:
- **Mock API** at `http://localhost:3000`
- **Angular app** at `http://localhost:4200`

### Or run them separately
```bash
# Terminal 1 – mock backend
npm run start:mock

# Terminal 2 – Angular app
npm start
```

### 3. Run unit tests
```bash
npm test
```

---

## Project Structure

```
src/app/
├── core/
│   ├── interceptors/     # AppHttpInterceptor (error handling + correlation-id)
│   └── services/         # EmployeeService, AccountService (HTTP calls)
│
├── shared/
│   ├── models/           # TypeScript interfaces (Employee, Account, etc.)
│   └── components/       # Reusable UI: StatusBadge, ConfirmDialog, LoadingSpinner
│
├── store/                # NgRx state management
│   ├── employee/         # actions, reducer, selectors, effects
│   └── account/          # actions, reducer, selectors, effects
│
└── features/             # Lazy-loaded feature pages
    ├── employees/
    │   ├── employee-list/     # Search/filter table
    │   ├── employee-detail/   # Parent component
    │   └── employee-form/     # Create/Edit with reactive forms
    └── accounts/
        ├── account-list/      # Child component (receives @Input employeeId)
        └── account-form/      # Inline add form (emits @Output saved)

mock-server/
├── db.json         # Seed data for employees and accounts
└── routes.json     # Maps /api/* → json-server paths
```

---

## NgRx Architecture

### How data flows

```
User clicks "Load" 
  → Component dispatches Action
    → Effect catches Action, calls Service (HTTP)
      → On success: dispatch Success Action
        → Reducer updates state
          → Selector reads state
            → Component renders via async pipe
```

### Store slices

| Slice | What it holds |
|-------|--------------|
| `employees` | All employee records + loading/error flags |
| `accounts` | Accounts for the currently viewed employee |

### Key NgRx patterns used

- **EntityAdapter** — normalizes lists into `{ ids[], entities{} }` for O(1) lookups
- **Effects** — all API calls live here, keeping components clean
- **Selectors** — `createSelector` for derived data (e.g., `selectTotalBalance`)
- **Actions** — descriptive names like `[Employee List] Load Employees`

---

## API Endpoints (mock)

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `/api/employees` | List with `?q=&role=&status=` filters |
| POST | `/api/employees` | Create |
| GET | `/api/employees/:id` | Get one |
| PUT | `/api/employees/:id` | Full update |
| PATCH | `/api/employees/:id` | Partial update (e.g., status) |
| DELETE | `/api/employees/:id` | Delete |
| GET | `/api/accounts?employeeId=` | Get accounts for employee |
| POST | `/api/accounts` | Create account |
| PUT | `/api/accounts/:id` | Update account |
| PATCH | `/api/accounts/:id` | Soft-close account |
| DELETE | `/api/accounts/:id` | Remove account |

---

## Tests

Four test files covering minimum requirements:

| File | What it tests |
|------|--------------|
| `employee.reducer.spec.ts` | Reducer state transitions |
| `employee.effects.spec.ts` | Effects dispatching correct actions |
| `employee.service.spec.ts` | HTTP methods and URLs |
| `employee-form.component.spec.ts` | Form validation logic |
