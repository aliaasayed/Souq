import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProComponent } from './seller-pro.component';

describe('SellerProComponent', () => {
  let component: SellerProComponent;
  let fixture: ComponentFixture<SellerProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
