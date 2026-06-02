import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account, CreateAccountDto } from '../../shared/models/models';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly base = '/api';

  constructor(private http: HttpClient) {}

  // GET /api/employees/:empId/accounts
  // json-server doesn't nest, so we filter by employeeId
  getByEmployee(employeeId: string): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.base}/accounts?employeeId=${employeeId}`);
  }

  // GET /api/accounts/:id
  getById(id: string): Observable<Account> {
    return this.http.get<Account>(`${this.base}/accounts/${id}`);
  }

  // POST /api/accounts
  create(dto: CreateAccountDto): Observable<Account> {
    return this.http.post<Account>(`${this.base}/accounts`, dto);
  }

  // PUT /api/accounts/:id  (full update)
  update(id: string, account: Account): Observable<Account> {
    return this.http.put<Account>(`${this.base}/accounts/${id}`, account);
  }

  // PATCH /api/accounts/:id  (soft close)
  close(id: string): Observable<Account> {
    return this.http.patch<Account>(`${this.base}/accounts/${id}`, { status: 'CLOSED' });
  }

  // DELETE /api/accounts/:id
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/accounts/${id}`);
  }
}
