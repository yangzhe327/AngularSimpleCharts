import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedLineChartComponent } from './stackedlinechart.component';

describe('StackedLineChartComponent', () => {
  let component: StackedLineChartComponent;
  let fixture: ComponentFixture<StackedLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackedLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
