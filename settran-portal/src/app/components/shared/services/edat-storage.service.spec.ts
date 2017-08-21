import { TestBed, inject } from '@angular/core/testing';

import { EdatStorageService } from './edat-storage.service';

describe('EdatStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EdatStorageService]
    });
  });

  it('should be created', inject([EdatStorageService], (service: EdatStorageService) => {
    expect(service).toBeTruthy();
  }));
});
