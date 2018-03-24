import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSouqComponent } from './signup-souq.component';

describe('SignupSouqComponent', () => {
  let component: SignupSouqComponent;
  let fixture: ComponentFixture<SignupSouqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupSouqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupSouqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
