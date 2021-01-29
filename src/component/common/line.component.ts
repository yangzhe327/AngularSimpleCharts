import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { line } from 'd3-shape'
  @Component({
    selector: 'g[chart-line]',
    template: `
      <svg:path
          class="line"
          [attr.d]="linePath(data)"
          [attr.fill]="fill"
          [attr.stroke]="color"
          [attr.stroke-width]="2"
      />
    `,
  })
  export class LineComponent implements OnChanges {
    @Input() data: any
    @Input() color: string
    @Input() fill: string = 'none';
    @Input() x: any
    @Input() y: any
    @Input() bandwidth: number
    @Input() width: number
    @Input() height: number

    linePath: any
  
    ngOnChanges(changes: SimpleChanges): void {

        this.x = this.x.range([this.bandwidth / 2, this.width + this.bandwidth / 2]);
        this.y = this.y.range([this.height, 0]);
      
        this.linePath = line()
        .x( (d: any) => this.x(d.name))
        .y( (d: any) => this.y(d.value))
    }
  }
  