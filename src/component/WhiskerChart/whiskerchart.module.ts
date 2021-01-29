import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartCommonModule } from '../common/common.module'
import { WhiskerChartComponent } from './whiskerchart.component';
import { HttpClientModule }    from '@angular/common/http'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ChartCommonModule
  ],
  declarations: [WhiskerChartComponent],
  exports: [WhiskerChartComponent],
})
export class WhiskerbarChartModule {
 }
