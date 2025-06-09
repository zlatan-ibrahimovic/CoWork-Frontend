import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { expect, jest } from '@jest/globals';


describe('UserService', () => {
  let service: UserService;
  let httpClientMock: jest.Mocked<HttpClient>;

  beforeEach(async () => {
    httpClientMock = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<HttpClient>;

    await TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: HttpClient, useValue: httpClientMock }, // Mock de HttpClient
      ],
    }).compileComponents();

    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });
});
