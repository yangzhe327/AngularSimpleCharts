import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
  } from '@angular/core';
  
    @Component({
      selector: 'g[chart-whisker-target]',
      template: `
        <svg:rect 
            class="chart-whisker-target"
            [attr.width] = "width"
            [attr.height] = "height"
            [attr.x]= "x + xOffset"
            [attr.y] = "y + yOffset"
            [attr.fill] = "color"
            [attr.transform]="transform">
        </svg:rect>
      `
    })
    export class TargetComponent implements OnChanges {
      @Input() x: any
      @Input() y: any
      @Input() width: any
      @Input() height: any
      @Input() color: any
      @Input() decorator: boolean = false
  
      halfWidth: number
      halfHeight: number
      xOffset: number
      yOffset: number
      transform: any
    
      ngOnChanges(changes: SimpleChanges): void {
        this.width -= 1
        this.height -= 1
        this.halfWidth = this.width / 2
        this.halfHeight = this.height / 2
        this.xOffset = this.decorator ? this.halfWidth : 0
        this.yOffset = this.decorator ? this.halfHeight : 0
        this.transform = `translate(${-this.halfWidth},${-this.halfWidth}) rotate(45,${this.x + this.xOffset + this.halfWidth},${this.y + this.yOffset + this.halfWidth})`
      }
    }
    