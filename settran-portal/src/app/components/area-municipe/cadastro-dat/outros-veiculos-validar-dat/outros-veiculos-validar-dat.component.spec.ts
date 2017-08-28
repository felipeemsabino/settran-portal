import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutrosVeiculosValidarDatComponent } from './outros-veiculos-validar-dat.component';

describe('OutrosVeiculosValidarDatComponent', () => {
  let component: OutrosVeiculosValidarDatComponent;
  let fixture: ComponentFixture<OutrosVeiculosValidarDatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutrosVeiculosValidarDatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutrosVeiculosValidarDatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
