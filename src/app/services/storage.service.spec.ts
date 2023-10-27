import { TestBed } from '@angular/core/testing';

import { StorageService as StorageService } from './storage.service';

describe('StorageServiceService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
