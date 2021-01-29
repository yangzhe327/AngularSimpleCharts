import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartCommonModule } from '../common/common.module'
import { DonutStatusChartComponent } from './donutstatuschart.component';
import { HttpClientModule }    from '@angular/common/http'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ChartCommonModule
  ],
  declarations: [DonutStatusChartComponent],
  exports: [DonutStatusChartComponent],
})
export class DonutStatusChartModule {
 }
