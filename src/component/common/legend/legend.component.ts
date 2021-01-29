import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
  } from '@angular/core';

  import { colorWithMeaningPalette } from '../color-palette'
  import { legendPresetArrangement } from './legend-arrangement'
  
    @Component({
      selector: 'g[chart-legend]',
      template: `
          <svg:g legend-decorator-circleuponline
          *ngIf="decorator == 'CircleUponLine'"
              [color]="styles.colors[legendIndex]"
              [x]="getX(legendIndex)"
              [y]="getY(legendIndex)"
              [width]="legendWidth"
              [height]="legendHeight"
          />
          <svg:g legend-decorator-square
          *ngIf="decorator == 'Square'"
              [color]="styles.colors[legendIndex]"
              [x]="getX(legendIndex)"
              [y]="getY(legendIndex)"
              [width]="legendWidth"
              [height]="legendHeight"
          />
          <svg:g chart-whisker-actual
          *ngIf="decorator == 'Actual'"
              [x]="getX(legendIndex) + legendWidth * 0.5"
              [y]="getY(legendIndex) + legendHeight * 0.5"
              [width]="legendWidth"
              [height]="legendHeight"
              [color]="styles.colors[legendIndex]"
          />
          <svg:g chart-whisker-target
          *ngIf="decorator == 'Target'"
              [x]="getX(legendIndex) + legendWidth * 0.5"
              [y]="getY(legendIndex) + legendHeight * 0.5"
              [width]="legendWidth"
              [height]="legendHeight"
              [color]="styles.colors[legendIndex]"
          />
          <svg:text
            class="chart-legend-text"
            [attr.x]="getX(legendIndex) + legendWidth + 10"
            [attr.y]="getY(legendIndex) + legendHeight * 0.5"
            [attr.dy]="dy"
            [attr.fill]="CAL"
            [attr.font-size]="13"
          >
          {{itemData}}
          </svg:text>
      `,
    })
    export class LegendComponent implements OnChanges {
      @Input() data: any
      @Input() width: number
      @Input() height: number
      @Input() itemData: any
      @Input() legendData: any
      @Input() legendIndex: number
      @Input() styles: any
      @Input() legendArrangement: string
      @Input() decoratorComponent: any
      @Input() padding: any
    
      CAL: string = colorWithMeaningPalette.CAL
      x: any
      y: any
      offset: any = { x: 0, y: 0 }
      getX: any
      getY: any
      legendWidth: number
      legendHeight: number
      dy: string = '.66ex'
      decorator: string

      ngOnChanges(changes: SimpleChanges): void {
        this.decorator = Array.isArray(this.decoratorComponent) ? 
        this.decoratorComponent[this.legendIndex] : this.decoratorComponent
        
        this.legendWidth = this.styles.width == undefined? 
          this.decorator == 'CircleUponLine' ? 15 : 10 
        : this.styles.width
        this.legendHeight = this.styles.height == undefined? 
        this.decorator == 'CircleUponLine' ? 15 : 10 
        : this.styles.height
        
        this.x = legendPresetArrangement[this.legendArrangement].legendX
        this.y = legendPresetArrangement[this.legendArrangement].legendY

        this.getX = typeof this.x === 'function' ? index => this.x(this.width, this.height, this.legendWidth, this.legendHeight, index, this.legendData) + this.offset.x : () => this.x + this.offset.x
        this.getY = typeof this.y === 'function' ? index => this.y(this.width, this.height, this.legendWidth, this.legendHeight, index, this.legendData) + this.offset.y : () => this.y + this.offset.y
      }
    }
    