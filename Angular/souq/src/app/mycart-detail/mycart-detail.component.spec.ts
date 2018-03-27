import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycartDetailComponent } from './mycart-detail.component';

describe('MycartDetailComponent', () => {
  let component: MycartDetailComponent;
  let fixture: ComponentFixture<MycartDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycartDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycartDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
