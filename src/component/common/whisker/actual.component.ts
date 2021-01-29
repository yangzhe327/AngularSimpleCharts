import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
  } from '@angular/core';
  
    @Component({
      selector: 'g[chart-whisker-actual]',
      template: `
        <svg:circle 
            class="chart-whisker-actual"
            [attr.cx]="x + xOffset"
            [attr.cy] = "y + yOffset"
            [attr.r]="halfWidth"
            [attr.fill] = "color">
        </svg:circle>
      `
    })
    export class ActualComponent implements OnChanges {
        @Input() x: any
        @Input() y: any
        @Input() width: number
        @Input() height: number
        @Input() color: string
        @Input() decorator: boolean = false
  
        halfWidth: number
        halfHeight: number
        xOffset: number
        yOffset: number
    
      ngOnChanges(changes: SimpleChanges): void {
        this.halfWidth = this.width / 2
        this.halfHeight = this.height / 2
        this.xOffset = this.decorator ? this.halfWidth : 0
        this.yOffset = this.decorator ? this.halfHeight : 0
      }
    }
    