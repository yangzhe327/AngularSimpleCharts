import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

  @Component({
    selector: 'g[chart-bar]',
    template: `
      <svg:rect 
        class="chart-bar"
        [attr.x]="_x(data)"
        [attr.y] = "_y(data)"
        [attr.width] = "pivot? _width(data) : barWidth"
        [attr.height] = "pivot? barWidth : _height(data)"
        [attr.fill] = "color">
      </svg:rect>
    `
  })
  export class BarComponent implements OnChanges {
    @Input() data: any
    @Input() pivot: boolean = false
    @Input() width: number
    @Input() height: number
    @Input() barWidth: number
    @Input() color: string
    @Input() x: any
    @Input() y: any
    @Input() offset: number = 0
    @Input() innerMargin: number = 0

    _x: any;
    _y: any;
    _width: any;
    _height: any;
    barColor: any;
  
    ngOnChanges(changes: SimpleChanges): void {
      
        this.x = this.pivot? 
        this.x.rangeRound([0, this.height])
        :this.x.range([0 , this.width]);
        this.y = this.pivot? 
        this.y.range([0 , this.width])
        : this.y.rangeRound([this.height, 0]);

        this._x = (d) => this.pivot? 0 : this.x(d.name) + this.offset
        this._y = (d) => this.pivot? this.x(d.name) + this.offset : this.y(d.value)
        this._width = d => this.y(d.value)
        this._height = d => this.height - this.y(d.value)
        this.barWidth = this.barWidth - this.innerMargin

    }
  }
  