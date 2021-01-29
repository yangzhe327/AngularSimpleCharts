import { NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, CommonModule } from '@angular/common';

import { ActualComponent } from './actual.component'
import { RangeComponent } from './range.component'
import { TargetComponent } from './target.component'
import { WhiskerComponent } from './whisker.component'

@NgModule({
  providers: [
    Location,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    }
  ],
  imports: [
    CommonModule
  ],
  declarations: [
    ActualComponent,
    RangeComponent,
    TargetComponent,
    WhiskerComponent
  ],
  exports: [
    ActualComponent,
    RangeComponent,
    TargetComponent,
    WhiskerComponent
  ]
})
export class WhiskerModule { }
