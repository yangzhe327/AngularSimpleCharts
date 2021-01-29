import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
  } from '@angular/core';
  
    @Component({
      selector: 'g[status-legend-element]',
      template: `
         <svg:rect 
            class="status-legend-decorator"
            [attr.x]= "x"
            [attr.y]= "y"
            [attr.width] = "width"
            [attr.height] = "height"
            [attr.fill] = "color">
        </svg:rect>
        <svg:text 
            class="status-legend-number"
            [attr.x]= "x + 19"
            [attr.y]= "y + width * 3.5"
            [attr.font-size] = "25">
            {{data}}
        </svg:text>
        <svg:text 
            class="status-legend-text"
            [attr.x]= "x + 19"
            [attr.y]= "y + width * 7"
            [attr.font-size] = "13">
            {{name}}
        </svg:text>
      `,
    })
    export class statusLegendElement implements OnChanges {
      @Input() data: any
      @Input() name: any 
      @Input() x: any
      @Input() y: any
      @Input() width: number
      @Input() height: number
      @Input() color: any

      ngOnChanges(changes: SimpleChanges): void {
      }
    }
    