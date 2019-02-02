import { TestBed, inject } from '@angular/core/testing';

import { OfferletterService } from './offerletter.service';

describe('OfferletterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfferletterService]
    });
  });

  it('should be created', inject([OfferletterService], (service: OfferletterService) => {
    expect(service).toBeTruthy();
  }));
});
