import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedRevenueComponent } from './stacked-revenue.component';

describe('StackedRevenueComponent', () => {
  let component: StackedRevenueComponent;
  let fixture: ComponentFixture<StackedRevenueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StackedRevenueComponent]
    });
    fixture = TestBed.createComponent(StackedRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
