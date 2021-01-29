import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutStatusChartComponent } from './donutstatuschart.component';

describe('DonutStatusChartComponent', () => {
  let component: DonutStatusChartComponent;
  let fixture: ComponentFixture<DonutStatusChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonutStatusChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutStatusChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
