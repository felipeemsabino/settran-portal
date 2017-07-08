import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroFaqComponent } from './cadastro-faq.component';

describe('CadastroFaqComponent', () => {
  let component: CadastroFaqComponent;
  let fixture: ComponentFixture<CadastroFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
