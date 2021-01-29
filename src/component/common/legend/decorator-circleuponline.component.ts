import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
  } from '@angular/core';

  import { colorWithMeaningPalette } from '../color-palette'
  
    @Component({
      selector: 'g[legend-decorator-circleuponline]',
      template: `
        <svg:g class="legend-decorator-circleuponline">
            <svg:line 
                [attr.x1]="x"
                [attr.y1]="y + height * .5"
                [attr.x2]="x + width"
                [attr.y2]="y + height * .5"
                [attr.stroke] = "color"
                [attr.stroke-width] = "2">
            </svg:line>
            <circle
                [attr.cx]="x + width * .5"
                [attr.cy]="y + height * .5"
                [attr.r]="2.5"
                [attr.y2]="y + height * .5"
                [attr.stroke] = "color"
                [attr.stroke-width] = "1"
                [attr.fill] = "JOY"
            />
        </svg:g>
      `,
    })
    export class CircleUponLineComponent implements OnChanges {
      @Input() color: string
      @Input() x: any
      @Input() y: any
      @Input() width: number
      @Input() height: number
      @Input() index: number

      JOY: string = colorWithMeaningPalette.JOY

      ngOnChanges(changes: SimpleChanges): void {
      }
    }
    