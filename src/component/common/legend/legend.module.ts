import { NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, CommonModule } from '@angular/common';

import { LegendComponent } from './legend.component'
import { SquareComponent } from './decorator-square.component'
import { CircleUponLineComponent } from './decorator-circleuponline.component'
import { WhiskerModule } from '../whisker/whisker.module'
import { statusLegendElement } from './statusLegendElement.component'
import { StatusLegendComponent } from './statusLegend.component'


@NgModule({
  providers: [
    Location,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    }
  ],
  imports: [
    CommonModule,
    WhiskerModule
  ],
  declarations: [
    LegendComponent,
    SquareComponent,
    CircleUponLineComponent,
    statusLegendElement,
    StatusLegendComponent
  ],
  exports: [
    LegendComponent,
    SquareComponent,
    CircleUponLineComponent,
    statusLegendElement,
    StatusLegendComponent
  ]
})
export class LegendrModule { }
