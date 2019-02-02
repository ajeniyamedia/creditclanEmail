import { TestBed, inject } from '@angular/core/testing';

import { OptionsserviceService } from './optionsservice.service';

describe('OptionsserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OptionsserviceService]
    });
  });

  it('should be created', inject([OptionsserviceService], (service: OptionsserviceService) => {
    expect(service).toBeTruthy();
  }));
});
