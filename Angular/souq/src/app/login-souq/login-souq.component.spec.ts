import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSouqComponent } from './login-souq.component';

describe('LoginSouqComponent', () => {
  let component: LoginSouqComponent;
  let fixture: ComponentFixture<LoginSouqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSouqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSouqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
