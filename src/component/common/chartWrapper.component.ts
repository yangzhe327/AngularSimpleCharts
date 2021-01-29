import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
  
  @Component({
    selector: 'chart-wrapper',
    template: `
      <div
        class="chart-wrapper"
        [style.width.px]="width"
        [style.height.px]="height" 
    >
        <svg
          class="ngx-charts"
          [attr.width]="width"
          [attr.height]="height"
        >
          <svg:g 
          [attr.transform]="transform">
            <ng-content></ng-content>
          </svg:g>
        </svg>
      </div>
    `
  })

  export class chartWrapper implements OnChanges {
  
    @Input() width;
    @Input() height;
    @Input() pivot;
    @Input() padding;

    transform: string;

    ngOnChanges(changes: SimpleChanges): void {
        this.transform = "translate(" + this.padding.left + "," + this.padding.top + ")";
      }
  }
  