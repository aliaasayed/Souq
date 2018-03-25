import { TestBed, inject } from '@angular/core/testing';

import { SellerProductsService } from './seller-products.service';

describe('SellerProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SellerProductsService]
    });
  });

  it('should be created', inject([SellerProductsService], (service: SellerProductsService) => {
    expect(service).toBeTruthy();
  }));
});
