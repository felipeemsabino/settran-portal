import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupControllerComponent } from './popup-controller.component';

describe('PopupControllerComponent', () => {
  let component: PopupControllerComponent;
  let fixture: ComponentFixture<PopupControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
