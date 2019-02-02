import { TestBed, inject } from '@angular/core/testing';

import { GmapsserviceService } from './gmapsservice.service';

describe('GmapsserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GmapsserviceService]
    });
  });

  it('should be created', inject([GmapsserviceService], (service: GmapsserviceService) => {
    expect(service).toBeTruthy();
  }));
});
