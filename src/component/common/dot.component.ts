import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

  @Component({
    selector: 'g[chart-dot]',
    template: `
      <svg:circle
      *ngFor="let item of data; let i=index;"
          class="dot"
          [attr.cx]="x(item.name)"
          [attr.cy]="y(item.value)"
          [attr.r]="r"
          [attr.fill]="fill"
          [attr.stroke]="color"
          [attr.stroke-width]="2"
      />
    `,
  })
  export class DotComponent implements OnChanges {
    @Input() data: any
    @Input() color: string
    @Input() fill: string = 'white';
    @Input() x: any
    @Input() y: any
    @Input() bandwidth: number
    @Input() width: number
    @Input() height: number

    r: number

    ngOnChanges(changes: SimpleChanges): void {
        this.r = 3.5
        
        this.x = this.x.range([this.bandwidth / 2, this.width + this.bandwidth / 2]);
        this.y = this.y.range([this.height, 0]);
    }
  }
  