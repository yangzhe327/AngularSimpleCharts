import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
  } from '@angular/core';
  
    @Component({
      selector: 'g[chart-whisker-range]',
      template: `
        <svg:line
            [attr.x1]="x - halfLen"
            [attr.y1] = "yMax"
            [attr.x2]="x + halfLen"
            [attr.y2] = "yMax"
            [attr.stroke] = "styles.stroke"
            [attr.stroke-width] = "styles.strokeWidthII">
        </svg:line>
        <svg:line 
            [attr.x1]="x"
            [attr.y1] = "yMax"
            [attr.x2]="x"
            [attr.y2] = "yMin"
            [attr.stroke] = "styles.stroke"
            [attr.stroke-width] = "styles.strokeWidth">
        </svg:line>
        <svg:line 
            [attr.x1]="x - halfLen"
            [attr.y1] = "yMin"
            [attr.x2]="x + halfLen"
            [attr.y2] = "yMin"
            [attr.stroke] = "styles.stroke"
            [attr.stroke-width] = "styles.strokeWidthII">
        </svg:line>
      `
    })
    export class RangeComponent implements OnChanges {
      @Input() x: any
      @Input() yMin: any
      @Input() yMax: any
      @Input() styles: any
  
      halfLen: any
    
      ngOnChanges(changes: SimpleChanges): void {

        this.halfLen = this.styles.length / 2
      }
    }
    