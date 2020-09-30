import { TestBed } from '@angular/core/testing';

import { ProductCartsService } from './product-carts.service';

describe('ProductCartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductCartsService = TestBed.get(ProductCartsService);
    expect(service).toBeTruthy();
  });
});
