import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
  } from '@angular/core';
  
    @Component({
      selector: 'g[legend-decorator-square]',
      template: `
      <svg:rect 
        class="legend-decorator-square"
        [attr.x]="x"
        [attr.y] = "y"
        [attr.width] = "width"
        [attr.height] = "height"
        [attr.fill] = "color">
      </svg:rect>
      `,
    })
    export class SquareComponent implements OnChanges {
      @Input() color: string
      @Input() x: any
      @Input() y: any
      @Input() width: number
      @Input() height: number

      ngOnChanges(changes: SimpleChanges): void {}
    }
    