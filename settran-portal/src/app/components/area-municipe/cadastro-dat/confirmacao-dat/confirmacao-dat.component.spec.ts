import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacaoDatComponent } from './confirmacao-dat.component';

describe('ConfirmacaoDatComponent', () => {
  let component: ConfirmacaoDatComponent;
  let fixture: ComponentFixture<ConfirmacaoDatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacaoDatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacaoDatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
