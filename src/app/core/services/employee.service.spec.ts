import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';
import { Employee } from '../../shared/models/models';

const mockEmployee: Employee = {
  id: 'emp-001', firstName: 'Alice', lastName: 'Johnson',
  email: 'alice@bank.com', role: 'ADMIN', status: 'ACTIVE'
};

describe('EmployeeService', () => {
  let service: EmployeeService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService]
    });
    service = TestBed.inject(EmployeeService);
    http    = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify()); // make sure no pending requests

  it('should call GET /api/employees', () => {
    service.getAll().subscribe(emps => expect(emps.length).toBe(1));
    const req = http.expectOne(r => r.url.includes('/api/employees'));
    expect(req.request.method).toBe('GET');
    req.flush([mockEmployee]);
  });

  it('should call GET /api/employees/:id', () => {
    service.getById('emp-001').subscribe(emp => expect(emp.id).toBe('emp-001'));
    const req = http.expectOne('/api/employees/emp-001');
    req.flush(mockEmployee);
  });

  it('should call POST /api/employees on create', () => {
    const dto = { firstName: 'Bob', lastName: 'Smith', email: 'bob@bank.com', role: 'MANAGER' as const, status: 'ACTIVE' as const };
    service.create(dto).subscribe(emp => expect(emp.firstName).toBe('Bob'));
    const req = http.expectOne('/api/employees');
    expect(req.request.method).toBe('POST');
    req.flush({ ...dto, id: 'emp-002' });
  });

  it('should call DELETE /api/employees/:id', () => {
    service.delete('emp-001').subscribe();
    const req = http.expectOne('/api/employees/emp-001');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should call PATCH /api/employees/:id on patchStatus', () => {
    service.patchStatus('emp-001', 'INACTIVE').subscribe();
    const req = http.expectOne('/api/employees/emp-001');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ status: 'INACTIVE' });
    req.flush({ ...mockEmployee, status: 'INACTIVE' });
  });
});
