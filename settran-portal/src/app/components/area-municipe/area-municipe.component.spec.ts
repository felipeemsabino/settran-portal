import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaMunicipeComponent } from './area-municipe.component';

describe('AreaMunicipeComponent', () => {
  let component: AreaMunicipeComponent;
  let fixture: ComponentFixture<AreaMunicipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaMunicipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaMunicipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
