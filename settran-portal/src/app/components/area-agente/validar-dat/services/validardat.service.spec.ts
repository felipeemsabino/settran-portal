import { TestBed, inject } from '@angular/core/testing';

import { ValidardatService } from './validardat.service';

describe('ValidardatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidardatService]
    });
  });

  it('should be created', inject([ValidardatService], (service: ValidardatService) => {
    expect(service).toBeTruthy();
  }));
});
