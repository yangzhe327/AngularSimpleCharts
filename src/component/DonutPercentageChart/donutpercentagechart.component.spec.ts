import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutPercentageChartComponent } from './donutpercentagechart.component';

describe('DonutPercentageChartComponent', () => {
  let component: DonutPercentageChartComponent;
  let fixture: ComponentFixture<DonutPercentageChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonutPercentageChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutPercentageChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
