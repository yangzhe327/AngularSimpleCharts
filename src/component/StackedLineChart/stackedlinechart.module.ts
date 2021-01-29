import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartCommonModule } from '../common/common.module'
import { StackedLineChartComponent } from './stackedlinechart.component';
import { HttpClientModule }    from '@angular/common/http'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ChartCommonModule
  ],
  declarations: [StackedLineChartComponent],
  exports: [StackedLineChartComponent],
})
export class StackedlineChartModule {
 }
