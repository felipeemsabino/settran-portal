import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAgenteComponent } from './popup-agente.component';

describe('PopupAgenteComponent', () => {
  let component: PopupAgenteComponent;
  let fixture: ComponentFixture<PopupAgenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupAgenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
