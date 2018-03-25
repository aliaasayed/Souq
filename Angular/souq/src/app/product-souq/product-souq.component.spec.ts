import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSouqComponent } from './product-souq.component';

describe('ProductSouqComponent', () => {
  let component: ProductSouqComponent;
  let fixture: ComponentFixture<ProductSouqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSouqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSouqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
