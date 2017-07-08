import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaAgenteComponent } from './area-agente.component';

describe('AreaAgenteComponent', () => {
  let component: AreaAgenteComponent;
  let fixture: ComponentFixture<AreaAgenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaAgenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
