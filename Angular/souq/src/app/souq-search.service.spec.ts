import { TestBed, inject } from '@angular/core/testing';

import { SouqSearchService } from './souq-search.service';

describe('SouqSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SouqSearchService]
    });
  });

  it('should be created', inject([SouqSearchService], (service: SouqSearchService) => {
    expect(service).toBeTruthy();
  }));
});
