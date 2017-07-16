import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosAcidenteComponent } from './dados-acidente.component';

describe('DadosAcidenteComponent', () => {
  let component: DadosAcidenteComponent;
  let fixture: ComponentFixture<DadosAcidenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosAcidenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosAcidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
