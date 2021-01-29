import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
  } from '@angular/core';

  import { legendPreset } from './legend-arrangement'
  
    @Component({
      selector: 'g[chart-legend-status]',
      template: `
          <svg:g status-legend-element
          *ngFor="let item of legendData; let i=index;"
              [data]="item.value"
              [name]="item.label"
              [x]="getX(i)"
              [y]="getY(i)"
              [width]="styles.width"
              [height]="styles.height"
              [color]=styles.colors[i]
          />
          <svg:g status-legend-element
      `,
    })
    export class StatusLegendComponent implements OnChanges {
      @Input() width: number
      @Input() height: number
      @Input() legendData: any
      @Input() styles: any
    
      x: any
      y: any
      offset: any = { x: 0, y: 0 }
      getX: any
      getY: any

      ngOnChanges(changes: SimpleChanges): void {
        this.x = legendPreset.legendX
        this.y = legendPreset.legendY
        this.getX = typeof this.x === 'function' ? index => this.x(this.width, this.height, this.styles.width, this.styles.height, index, this.legendData) + this.offset.x : () => this.x + this.offset.x
        this.getY = typeof this.y === 'function' ? index => this.y(this.width, this.height, this.styles.width, this.styles.height, index, this.legendData) + this.offset.y : () => this.y + this.offset.y
      }
    }
    