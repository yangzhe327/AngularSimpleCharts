import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartCommonModule } from '../common/common.module'
import { DonutPercentageChartComponent } from './donutpercentagechart.component';
import { HttpClientModule }    from '@angular/common/http'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ChartCommonModule
  ],
  declarations: [DonutPercentageChartComponent],
  exports: [DonutPercentageChartComponent],
})
export class DonutPercentageChartModule {
 }
