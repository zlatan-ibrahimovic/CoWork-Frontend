import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { provideHttpClient } from '@angular/common/http';
import { expect } from '@jest/globals';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskService,
        provideHttpClient()
      ]
    });

    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
