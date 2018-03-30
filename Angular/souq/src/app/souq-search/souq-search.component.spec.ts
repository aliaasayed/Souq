import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SouqSearchComponent } from './souq-search.component';

describe('SouqSearchComponent', () => {
  let component: SouqSearchComponent;
  let fixture: ComponentFixture<SouqSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SouqSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SouqSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
