import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarDatComponent } from './validar-dat.component';

describe('ValidarDatComponent', () => {
  let component: ValidarDatComponent;
  let fixture: ComponentFixture<ValidarDatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarDatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarDatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
