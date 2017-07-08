import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDatComponent } from './consulta-dat.component';

describe('ConsultaDatComponent', () => {
  let component: ConsultaDatComponent;
  let fixture: ComponentFixture<ConsultaDatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaDatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaDatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
