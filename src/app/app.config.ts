import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { employeeReducer } from './store/employee/employee.reducer';
import { accountReducer }  from './store/account/account.reducer';
import { EmployeeEffects }  from './store/employee/employee.effects';
import { AccountEffects }   from './store/account/account.effects';
import { AppHttpInterceptor } from './core/interceptors/app-http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // HttpClient + our error/logging interceptor
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },

    // NgRx: register reducers under feature names
    provideStore({
      employees: employeeReducer,
      accounts:  accountReducer
    }),

    // NgRx Effects
    provideEffects([EmployeeEffects, AccountEffects]),

    // NgRx DevTools (shows up in Redux DevTools browser extension)
    provideStoreDevtools({ maxAge: 25, logOnly: false })
  ]
};
