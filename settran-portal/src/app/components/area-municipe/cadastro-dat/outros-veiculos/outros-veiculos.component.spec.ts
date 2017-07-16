import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutrosVeiculosComponent } from './outros-veiculos.component';

describe('OutrosVeiculosComponent', () => {
  let component: OutrosVeiculosComponent;
  let fixture: ComponentFixture<OutrosVeiculosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutrosVeiculosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutrosVeiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
