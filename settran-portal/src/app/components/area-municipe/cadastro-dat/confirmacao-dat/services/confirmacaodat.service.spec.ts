import { TestBed, inject } from '@angular/core/testing';

import { ConfirmacaodatService } from './confirmacaodat.service';

describe('ConfirmacaodatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmacaodatService]
    });
  });

  it('should be created', inject([ConfirmacaodatService], (service: ConfirmacaodatService) => {
    expect(service).toBeTruthy();
  }));
});
