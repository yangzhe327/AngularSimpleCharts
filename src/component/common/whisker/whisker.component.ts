import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
  } from '@angular/core';

  import { isNumberOrNumberString } from '../util'
  
    @Component({
      selector: 'g[chart-whisker]',
      template: `
        <svg:g chart-whisker-range 
        *ngIf="Min && Max"
            [x]= "x(data.name) + offset"
            [yMin]= "y(data.min)"
            [yMax]= "y(data.max)"
            [styles]= "styles.range">
        </svg:g>
        <svg:g chart-whisker-target 
        *ngIf="Target"
            [x]= "x(data.name) + offset"
            [y]= "y(data.target)"
            [width]= "styles.rect.length"
            [height]= "styles.rect.length"
            [color]= "styles.rect.fill">
        </svg:g>
        <svg:g chart-whisker-actual 
        *ngIf="Min && Max"
            [x]= "x(data.name) + offset"
            [y]= "y(data.actual)"
            [width]= "styles.circle.r * 2"
            [height]= "styles.circle.r * 2"
            [color]= "styles.circle.fill">
        </svg:g>
      `
    })
    export class WhiskerComponent implements OnChanges {
      @Input() data: any
      @Input() x: any
      @Input() y: any
      @Input() offset: number
      @Input() styles: any

      Min: boolean
      Max: boolean
      Target: boolean
    
      ngOnChanges(changes: SimpleChanges): void {
        this.Min=isNumberOrNumberString(this.data.min)
        this.Max=isNumberOrNumberString(this.data.max)
        this.Target=isNumberOrNumberString(this.data.target)
      }
    }
    