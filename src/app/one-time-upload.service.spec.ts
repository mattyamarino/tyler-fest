import { TestBed } from '@angular/core/testing';

import { OneTimeUploadService } from './one-time-upload.service';

describe('OneTimeUploadService', () => {
  let service: OneTimeUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OneTimeUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
