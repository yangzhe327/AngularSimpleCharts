import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
  } from '@angular/core';
  
    @Component({
      selector: 'g[chart-bubble]',
      template: `
        <svg:circle
            class="bubble"
            [attr.cx]="x(data.name)"
            [attr.cy]="y(data.value)"
            [attr.r]="getRadius(data.value, data.radius)"
            [attr.fill]="styles.color"
            [attr.opacity]="styles.opacity"
            [attr.stroke-width]="2"
        />
      `,
    })
    export class BubbleComponent implements OnChanges {
      @Input() data: any
      @Input() styles: any
      @Input() x: any
      @Input() y: any
      @Input() width: number
      @Input() height: number
      @Input() xBandwidth: number
      @Input() yBandwidth: number
      @Input() maxValue: number
  
      getRadius: any
  
      ngOnChanges(changes: SimpleChanges): void {
        this.x = this.x.range([0, this.width]);
        this.y = this.y.range([0, this.height]);

        this.getRadius = (value, radius) => {
          if(this.styles.radius == undefined){
            let maxRadius = Math.min(this.xBandwidth, this.yBandwidth) / 2
            let percent = isNaN(radius) ? value / this.maxValue : radius
            return maxRadius * percent
          }
          else{
            return this.styles.radius
          }
        }

    }
    }
    