import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartCommonModule } from '../common/common.module'
import { GroupBarChartComponent } from './groupbarchart.component';
import { HttpClientModule }    from '@angular/common/http'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ChartCommonModule
  ],
  declarations: [GroupBarChartComponent],
  exports: [GroupBarChartComponent],
})
export class GroupbarChartModule {
 }
