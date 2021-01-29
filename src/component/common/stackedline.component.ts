import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { line } from 'd3-shape'

  @Component({
    selector: 'g[chart-stackedline]',
    template: `
      <svg:path
          class="line"
          [attr.d]="linePath(stackedData)"
          [attr.fill]="fill"
          [attr.stroke]="color"
          [attr.stroke-width]="2"
      />
    `,
  })
  export class StackedLineComponent implements OnChanges {
    @Input() data: any
    @Input() color: string
    @Input() fill: string = 'none';
    @Input() x: any
    @Input() y: any
    @Input() bandwidth: number
    @Input() width: number
    @Input() height: number

    stackedData: any
    linePath: any
  
    ngOnChanges(changes: SimpleChanges): void {
      this.stackedData = this.toData(this.data)

      this.x = this.x.range([this.bandwidth / 2, this.width + this.bandwidth / 2]);
      this.y = this.y.range([this.height, 0]);
    
      this.linePath = line()
      .x( (d: any) => this.x(d.name))
      .y( (d: any) => this.y(d.value))
    }

    toData(data) {
      return data.map(i => Object.assign(i, { value: i.y1 }))
    }
  }
  