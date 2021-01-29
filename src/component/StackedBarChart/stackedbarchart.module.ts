import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartCommonModule } from '../common/common.module'
import { StackedBarChartComponent } from './stackedbarchart.component';
import { HttpClientModule }    from '@angular/common/http'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ChartCommonModule
  ],
  declarations: [StackedBarChartComponent],
  exports: [StackedBarChartComponent],
})
export class StackedbarChartModule {
 }
