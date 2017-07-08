import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupFaqComponent } from './popup-faq.component';

describe('PopupFaqComponent', () => {
  let component: PopupFaqComponent;
  let fixture: ComponentFixture<PopupFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
