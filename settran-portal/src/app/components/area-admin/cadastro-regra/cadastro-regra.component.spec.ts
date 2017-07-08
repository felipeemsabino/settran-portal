import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroRegraComponent } from './cadastro-regra.component';

describe('CadastroRegraComponent', () => {
  let component: CadastroRegraComponent;
  let fixture: ComponentFixture<CadastroRegraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroRegraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroRegraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
