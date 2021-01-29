import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
  } from '@angular/core';
  
    @Component({
      selector: 'g[chart-floatingbar]',
      template: `
        <svg:rect
            class="floatingbar"
            [attr.width]="pivot? _width(data) : barWidth"
            [attr.height]="pivot? barWidth : _height(data)"
            [attr.x]="_x(data)"
            [attr.y]="_y(data)"
            [attr.fill]="monoColor? monoColors[0] 
            : increase(data.begin, data.end)? colors[0] : colors[1]"
        />
        <svg:rect
            class="cap"
            [attr.width]="pivot? capHeight : barWidth"
            [attr.height]="pivot? barWidth : capHeight"
            [attr.x]="_xcap(data)"
            [attr.y]="_ycap(data)"
            [attr.fill]="monoColor? monoColors[0] 
            : increase(data.begin, data.end) ? colors[2] : colors[3]"
        />
      `,
    })
    export class FloatingBarComponent implements OnChanges {
      @Input() data: any
      @Input() pivot: boolean = false;
      @Input() width: number
      @Input() height: number
      @Input() styles: any
      @Input() monoColor: boolean
      @Input() x: any
      @Input() y: any
      @Input() offset: number = 0
      @Input() innerMargin: number = 0
  
      _x: any;
      _y: any;
      _xcap: any;
      _ycap: any;
      _width: any;
      _height: any;
      barColor: any;
      increase = (begin, end) => end >= begin ? true : false;
      capHeight: number;
      barWidth: number;
      colors: any;
      monoColors: any;
  
      ngOnChanges(changes: SimpleChanges): void {

        this.capHeight = this.styles.cap.height;
        this.barWidth = this.styles.bar.width;
        this.colors = this.styles.colors;
        this.monoColors = this.styles.monoColors;
      
        this.x = this.pivot? 
        this.x.rangeRound([0, this.height])
        :this.x.range([0, this.width]);
        this.y = this.pivot? 
        this.y.range([0 , this.width])
        : this.y.rangeRound([this.height, 0])

        this._x = (d) => this.pivot? 
        this.increase(d.begin, d.end) ? this.y(d.begin) : this.y(d.end) 
        : this.x(d.name) + this.offset

        this._y = (d) => this.pivot? 
        this.x(d.name) + this.offset
        : this.increase(d.begin, d.end) ? this.y(d.end) : this.y(d.begin)

        this._xcap = (d) => this.pivot? 
        this.increase(d.begin, d.end) ? this.y(d.end) : this.y(d.end) - this.capHeight
        : this.x(d.name) + this.offset

        this._ycap = (d) => this.pivot? 
        this.x(d.name) + this.offset
        : this.increase(d.begin, d.end) ? this.y(d.end) : this.y(d.end) - this.capHeight

        this._width = (d) => Math.abs(this.y(d.end) - this.y(d.begin))
        this._height = (d) => Math.abs(this.y(d.end) - this.y(d.begin))
        
        this.barWidth = this.barWidth - this.innerMargin

    }
    }
    