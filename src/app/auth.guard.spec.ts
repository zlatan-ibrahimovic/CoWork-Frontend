/// <reference types="jest" />

import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let userServiceMock: Partial<UserService>;
  let routerMock: Partial<Router>;

  beforeEach(() => {
    userServiceMock = {
      getToken: jest.fn().mockReturnValue('fake-token') // ✅ Simule un token
    };
    routerMock = {
      navigate: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        provideHttpClient(),
        provideRouter([]),
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should return true when canActivate is called', () => {
    expect(guard.canActivate()).toBe(true);
  });
});
