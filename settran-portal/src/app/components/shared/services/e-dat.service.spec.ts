import { TestBed, inject } from '@angular/core/testing';

import { EDATService } from './e-dat.service';

describe('EDATService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EDATService]
    });
  });

  it('should be created', inject([EDATService], (service: EDATService) => {
    expect(service).toBeTruthy();
  }));
});
