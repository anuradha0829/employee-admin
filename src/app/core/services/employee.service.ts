import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, CreateEmployeeDto, EmployeeFilter } from '../../shared/models/models';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly base = '/api/employees';

  constructor(private http: HttpClient) {}

  // GET /api/employees  (with optional filters)
  getAll(filter: EmployeeFilter = {}): Observable<Employee[]> {
    let params = new HttpParams();
    if (filter.search) params = params.set('q', filter.search);   // json-server full-text uses ?q=
    if (filter.role)   params = params.set('role', filter.role);
    if (filter.status) params = params.set('status', filter.status);
    return this.http.get<Employee[]>(this.base, { params });
  }

  // GET /api/employees/:id
  getById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.base}/${id}`);
  }

  // POST /api/employees
  create(dto: CreateEmployeeDto): Observable<Employee> {
    return this.http.post<Employee>(this.base, dto);
  }

  // PUT /api/employees/:id  (full update)
  update(id: string, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.base}/${id}`, employee);
  }

  // PATCH /api/employees/:id  (partial – e.g., status only)
  patchStatus(id: string, status: 'ACTIVE' | 'INACTIVE'): Observable<Employee> {
    return this.http.patch<Employee>(`${this.base}/${id}`, { status });
  }

  // DELETE /api/employees/:id
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  // Async validator: check if email already exists
  checkEmailExists(email: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.base}?email=${email}`);
  }
}
