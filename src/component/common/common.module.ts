import { NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, CommonModule } from '@angular/common';

// import { ChartContainerModule } from './container/container.module'
import { LegendrModule } from './legend/legend.module'
import { WhiskerModule } from './whisker/whisker.module'
import { chartWrapper } from './chartWrapper.component';
import { XAxisComponent } from './x-axis.component'
import { YAxisComponent } from './y-axis.component'
import { XGridComponent } from './x-grid.component'
import { YGridComponent } from './y-grid.component'
import { BarComponent } from './bar.component'
import { GroupBarComponent } from './groupbar.component'
import { LineComponent } from './line.component'
import { DotComponent } from './dot.component'
import { AreaComponent } from './area.component'
import { StackedAreaComponent } from './stackedarea.component'
import { StackedDotComponent } from './stackeddot.component'
import { StackedLineComponent } from './stackedline.component'
import { StackedBarComponent } from './stackedbar.component'
import { BubbleComponent } from './bubble.component'
import { FloatingBarComponent } from './floatingbar.component'
import { DonutComponent } from './donut.component'

const COMPONENTS = [
  chartWrapper,
  XAxisComponent,
  YAxisComponent,
  XGridComponent,
  YGridComponent,
  BarComponent,
  GroupBarComponent,
  LineComponent,
  DotComponent,
  AreaComponent,
  StackedAreaComponent,
  StackedDotComponent,
  StackedLineComponent,
  StackedBarComponent,
  BubbleComponent,
  FloatingBarComponent,
  DonutComponent
];

@NgModule({
  providers: [
    Location,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  imports: [
    CommonModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    CommonModule,
    LegendrModule,
    WhiskerModule,
    ...COMPONENTS
    // ChartContainerModule
  ]
})
export class ChartCommonModule { }
