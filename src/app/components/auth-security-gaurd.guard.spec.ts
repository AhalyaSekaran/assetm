import { TestBed } from '@angular/core/testing';

import { AuthSecurityGaurdGuard } from './auth-security-gaurd.guard';

describe('AuthSecurityGaurdGuard', () => {
  let guard: AuthSecurityGaurdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthSecurityGaurdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
