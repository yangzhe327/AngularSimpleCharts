import {
    Component,
    Input,
    OnChanges,
    SimpleChanges,
  } from '@angular/core';
  
    @Component({
      selector: 'g[chart-stackedbar]',
      template: `
        <svg:rect 
            *ngFor="let item of data; let i=index;"
            class="chart-bar"
            [attr.x]="_x(item, i)"
            [attr.y] = " _y(item, i)"
            [attr.width] = "pivot ? _width(item, i) : barWidth"
            [attr.height] = "pivot ? barWidth : _height(item, i)"
            [attr.fill] = "colors[order? item.order : i]">
        </svg:rect>
      `
    })
    export class StackedBarComponent implements OnChanges {
      @Input() data: any
      @Input() pivot: boolean = false;
      @Input() width: number
      @Input() height: number
      @Input() styles: any
      @Input() bandwidth: number
      @Input() x: any
      @Input() y: any
      @Input() order: number
  
      _width: any
      _height: any
      rectWidth: any
      rectHeight: any
      _x: any
      _y: any
      innerMargin: number = 0
      moveBarToCenter: number
      last: number
      capHeight: number = 2
      barWidth: number
      colors: any
    
      ngOnChanges(changes: SimpleChanges): void {
        this.barWidth = this.styles.bar.width
        this.colors = this.styles.colors

        this.last = this.data.length - 1

        this.moveBarToCenter = (this.bandwidth - this.barWidth) / 2

        this.x = this.pivot? 
        this.x.rangeRound([0 , this.height])
        : this.x.rangeRound([0 , this.width]);
        this.y = this.pivot? 
        this.y.rangeRound([0 , this.width])
        : this.y.rangeRound([this.height, 0]);

        this._x = (d, i) => this.pivot? this.y(d.y0) + (i > 0? this.capHeight : 0) : this.x(d.name) + this.moveBarToCenter
        this._y = (d, i) => this.pivot? this.x(d.name) + this.moveBarToCenter : this.y(d.y1) + (i < this.last? this.capHeight : 0)

        this.rectWidth = (item) => this.y(item.y1) - this.y(item.y0) 
        this.rectHeight = (item) => this.y(item.y0) - this.y(item.y1)

        this._width = (item, i) => this.rectWidth(item)  - (i > 0? this.capHeight : 0) < 0? 
        0.1 : this.rectWidth(item) - (i > 0? this.capHeight : 0)

        this._height = (item, i) => this.rectHeight(item) - (i < this.last? this.capHeight : 0) < 0 ?
        0.1 : this.rectHeight(item) - (i < this.last? this.capHeight : 0)
      }
    }
    