import { TestBed } from '@angular/core/testing';

import { EmployeepageguardGuard } from '../employeepageguard.guard';

describe('EmployeepageguardGuard', () => {
  let guard: EmployeepageguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmployeepageguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
