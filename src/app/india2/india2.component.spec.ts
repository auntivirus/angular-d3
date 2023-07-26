import { ComponentFixture, TestBed } from '@angular/core/testing';

import { India2Component } from './india2.component';

describe('India2Component', () => {
  let component: India2Component;
  let fixture: ComponentFixture<India2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [India2Component]
    });
    fixture = TestBed.createComponent(India2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
