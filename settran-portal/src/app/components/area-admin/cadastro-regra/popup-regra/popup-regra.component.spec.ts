import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRegraComponent } from './popup-regra.component';

describe('PopupRegraComponent', () => {
  let component: PopupRegraComponent;
  let fixture: ComponentFixture<PopupRegraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupRegraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupRegraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
