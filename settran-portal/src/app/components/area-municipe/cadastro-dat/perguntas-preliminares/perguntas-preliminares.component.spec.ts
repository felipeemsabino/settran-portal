import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerguntasPreliminaresComponent } from './perguntas-preliminares.component';

describe('PerguntasPreliminaresComponent', () => {
  let component: PerguntasPreliminaresComponent;
  let fixture: ComponentFixture<PerguntasPreliminaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerguntasPreliminaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerguntasPreliminaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
