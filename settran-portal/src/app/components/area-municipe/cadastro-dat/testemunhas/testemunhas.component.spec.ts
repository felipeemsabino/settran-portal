import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestemunhasComponent } from './testemunhas.component';

describe('TestemunhasComponent', () => {
  let component: TestemunhasComponent;
  let fixture: ComponentFixture<TestemunhasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestemunhasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestemunhasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
