import { TestBed, inject } from '@angular/core/testing';

import { AgenteService } from './agente.service';

describe('AgenteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgenteService]
    });
  });

  it('should be created', inject([AgenteService], (service: AgenteService) => {
    expect(service).toBeTruthy();
  }));
});
