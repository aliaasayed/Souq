import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SouqhomeComponent } from './souqhome.component';

describe('SouqhomeComponent', () => {
  let component: SouqhomeComponent;
  let fixture: ComponentFixture<SouqhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SouqhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SouqhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
