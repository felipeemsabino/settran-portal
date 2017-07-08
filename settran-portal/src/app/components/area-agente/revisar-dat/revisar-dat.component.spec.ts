import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarDatComponent } from './revisar-dat.component';

describe('RevisarDatComponent', () => {
  let component: RevisarDatComponent;
  let fixture: ComponentFixture<RevisarDatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisarDatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisarDatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
