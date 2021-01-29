import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingBarChartComponent } from './floatingbarchart.component';

describe('FloatingBarChartComponent', () => {
  let component: FloatingBarChartComponent;
  let fixture: ComponentFixture<FloatingBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatingBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
