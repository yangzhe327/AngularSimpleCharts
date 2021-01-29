import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnPercentageChartComponent } from './columnpercentagechart.component';

describe('ColumnPercentageChartComponent', () => {
  let component: ColumnPercentageChartComponent;
  let fixture: ComponentFixture<ColumnPercentageChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnPercentageChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnPercentageChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
