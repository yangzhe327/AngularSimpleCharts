import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartCommonModule } from '../common/common.module'
import { FloatingBarChartComponent } from './floatingbarchart.component';
import { HttpClientModule }    from '@angular/common/http'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ChartCommonModule
  ],
  declarations: [FloatingBarChartComponent],
  exports: [FloatingBarChartComponent],
})
export class FloatingbarChartModule {
 }
