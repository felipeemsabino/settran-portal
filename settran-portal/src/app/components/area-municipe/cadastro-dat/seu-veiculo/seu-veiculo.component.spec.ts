import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeuVeiculoComponent } from './seu-veiculo.component';

describe('SeuVeiculoComponent', () => {
  let component: SeuVeiculoComponent;
  let fixture: ComponentFixture<SeuVeiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeuVeiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeuVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
