import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoComponent } from './relato.component';

describe('RelatoComponent', () => {
  let component: RelatoComponent;
  let fixture: ComponentFixture<RelatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
