import {
    Component,
    Input,
    OnChanges,
    SimpleChanges,
  } from '@angular/core';
  
    @Component({
      selector: 'g[chart-groupbar]',
      template: `
        <svg:g chart-bar
        *ngFor="let item of data; let i=index;"
            [data]="item"
            [pivot]="pivot"
            [width]="width"
            [height]="height"
            [barWidth]="this.styles.bar.width"
            [color]="this.styles.colors[i]"
            [x]="x"
            [y]="y"
            [offset]="offset(i) + moveBarToCenter"
            [innerMargin] = "innerMargin">
        </svg:g> 
      `
    })
    export class GroupBarComponent implements OnChanges {
      @Input() data: any
      @Input() pivot: boolean = false;
      @Input() width: number
      @Input() height: number
      @Input() styles: any
      @Input() bandwidth: number
      @Input() offset: any
      @Input() x: any
      @Input() y: any
  
      innerMargin: number = 2
      moveBarToCenter: number
    
      ngOnChanges(changes: SimpleChanges): void {
        this.moveBarToCenter = (this.bandwidth - this.styles.bar.width * this.data.length) / 2
      }
    }
    