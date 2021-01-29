import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartCommonModule } from '../common/common.module'
import { BubbleChartComponent } from './bubblechart.component';
import { ScatterPlotChartComponent } from './scatterplotchart.component'
import { HttpClientModule }    from '@angular/common/http'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ChartCommonModule
  ],
  declarations: [
    BubbleChartComponent,
    ScatterPlotChartComponent],
  exports: [
    BubbleChartComponent,
    ScatterPlotChartComponent],
})
export class BubbleChartModule {
 }
