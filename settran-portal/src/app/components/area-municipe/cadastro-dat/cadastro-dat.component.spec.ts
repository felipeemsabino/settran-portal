import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDatComponent } from './cadastro-dat.component';

describe('CadastroDatComponent', () => {
  let component: CadastroDatComponent;
  let fixture: ComponentFixture<CadastroDatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroDatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroDatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
