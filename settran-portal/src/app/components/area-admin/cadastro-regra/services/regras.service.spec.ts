import { TestBed, inject } from '@angular/core/testing';

import { RegrasService } from './regras.service';

describe('RegrasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegrasService]
    });
  });

  it('should be created', inject([RegrasService], (service: RegrasService) => {
    expect(service).toBeTruthy();
  }));
});
