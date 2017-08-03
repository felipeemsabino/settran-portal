import { TestBed, inject } from '@angular/core/testing';

import { ConsultadatService } from './consultadat.service';

describe('ConsultadatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultadatService]
    });
  });

  it('should be created', inject([ConsultadatService], (service: ConsultadatService) => {
    expect(service).toBeTruthy();
  }));
});
