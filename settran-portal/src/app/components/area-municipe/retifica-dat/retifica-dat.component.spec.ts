import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetificaDatComponent } from './retifica-dat.component';

describe('RetificaDatComponent', () => {
  let component: RetificaDatComponent;
  let fixture: ComponentFixture<RetificaDatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetificaDatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetificaDatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
