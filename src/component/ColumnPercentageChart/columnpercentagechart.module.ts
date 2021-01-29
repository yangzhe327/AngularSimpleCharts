import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartCommonModule } from '../common/common.module'
import { ColumnPercentageChartComponent } from './columnpercentagechart.component'
import { HttpClientModule }    from '@angular/common/http'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ChartCommonModule
  ],
  declarations: [ColumnPercentageChartComponent],
  exports: [ColumnPercentageChartComponent],
})
export class ColumnpercentageChartModule {
 }
