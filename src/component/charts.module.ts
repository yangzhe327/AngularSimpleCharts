import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule }    from '@angular/common/http';
import { BarChartModule } from './BarChart/barchart.module';
import { LineChartModule } from './LineChart/linechart.module';
import { StackedlineChartModule } from './StackedLineChart/stackedlinechart.module'
import { GroupbarChartModule } from './GroupBarChart/groupbarchart.module'
import { StackedbarChartModule } from './StackedBarChart/stackedbarchart.module'
import { ColumnpercentageChartModule } from './ColumnPercentageChart/columnpercentagechart.module'
import { BubbleChartModule } from './Bubble&ScatterPlotChart/bubblechart.module'
import { FloatingbarChartModule } from './FloatingBarChart/floatingbarchart.module'
import { WhiskerbarChartModule } from './WhiskerChart/whiskerchart.module'
import { DonutChartModule } from './DonutChart/donutchart.module'
import { DonutStatusChartModule } from './DonutStatusChart/donutstatuschart.module'
import { DonutPercentageChartModule } from './DonutPercentageChart/donutpercentagechart.module'
// should add to return in export module

@NgModule({
  exports: [
    BarChartModule,
    LineChartModule,
    StackedlineChartModule,
    GroupbarChartModule,
    StackedbarChartModule,
    ColumnpercentageChartModule,
    BubbleChartModule,
    FloatingbarChartModule,
    WhiskerbarChartModule,
    DonutChartModule,
    DonutStatusChartModule,
    DonutPercentageChartModule
  ]
})
export class ChartsModule {
 }
