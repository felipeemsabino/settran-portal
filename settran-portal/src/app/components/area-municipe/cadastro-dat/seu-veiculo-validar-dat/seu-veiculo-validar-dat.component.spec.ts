import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeuVeiculoValidarDatComponent } from './seu-veiculo-validar-dat.component';

describe('SeuVeiculoValidarDatComponent', () => {
  let component: SeuVeiculoValidarDatComponent;
  let fixture: ComponentFixture<SeuVeiculoValidarDatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeuVeiculoValidarDatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeuVeiculoValidarDatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
