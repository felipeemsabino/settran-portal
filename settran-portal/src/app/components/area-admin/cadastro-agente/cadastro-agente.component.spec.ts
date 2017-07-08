import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAgenteComponent } from './cadastro-agente.component';

describe('CadastroAgenteComponent', () => {
  let component: CadastroAgenteComponent;
  let fixture: ComponentFixture<CadastroAgenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroAgenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
