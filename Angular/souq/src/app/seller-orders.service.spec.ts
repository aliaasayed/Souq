import { TestBed, inject } from '@angular/core/testing';

import { SellerOrdersService } from './seller-orders.service';

describe('SellerOrdersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SellerOrdersService]
    });
  });

  it('should be created', inject([SellerOrdersService], (service: SellerOrdersService) => {
    expect(service).toBeTruthy();
  }));
});
