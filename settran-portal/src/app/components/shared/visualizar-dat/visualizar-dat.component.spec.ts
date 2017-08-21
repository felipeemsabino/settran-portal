import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarDatComponent } from './visualizar-dat.component';

describe('VisualizarDatComponent', () => {
  let component: VisualizarDatComponent;
  let fixture: ComponentFixture<VisualizarDatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarDatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarDatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
