import { TestBed, inject } from '@angular/core/testing';

import { RemitaService } from './remita.service';

describe('RemitaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemitaService]
    });
  });

  it('should be created', inject([RemitaService], (service: RemitaService) => {
    expect(service).toBeTruthy();
  }));
});
