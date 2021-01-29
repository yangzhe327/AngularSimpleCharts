import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiskerChartComponent } from './whiskerchart.component';

describe('WhiskerChartComponent', () => {
  let component: WhiskerChartComponent;
  let fixture: ComponentFixture<WhiskerChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhiskerChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiskerChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
