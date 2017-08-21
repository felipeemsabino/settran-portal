import { TestBed, inject } from '@angular/core/testing';

import { RevisardatService } from './revisardat.service';

describe('RevisardatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RevisardatService]
    });
  });

  it('should be created', inject([RevisardatService], (service: RevisardatService) => {
    expect(service).toBeTruthy();
  }));
});
