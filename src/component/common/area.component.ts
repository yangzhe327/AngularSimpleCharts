import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
  } from '@angular/core';

  import { toStacked, id } from './util'
  import { area } from 'd3-shape'

  @Component({
    selector: 'g[chart-area]',
    template: `
        <ng-container 
        *ngIf="area">
            <svg:linearGradient
            [id]="gradientId"
            [attr.x1]="x1"
            [attr.y1]="y1"
            [attr.x2]="x2"
            [attr.y2]="y2">
            <svg:stop *ngFor="let stop of gradientStops"
                [attr.offset]="stop.offset + '%'"
                [style.stop-color]="stop.color"
                [style.stop-opacity]="stop.opacity"
            />
            </svg:linearGradient>
            <svg:path
                class="chart-area"
                [attr.d]="areaPath(stackedData)"
                [attr.fill]="gradientFill"
            />
        </ng-container>
    `,
  })
  export class AreaComponent implements OnChanges {
    @Input() data: any
    @Input() color: string
    @Input() x: any
    @Input() y: any
    @Input() bandwidth: number
    @Input() width: number
    @Input() height: number
    @Input() area: boolean

    stackedData: any
    gradientFill: string
    gradientId: string
    gradientStops: any[]
    x1: any
    x2: any
    y1: any
    y2: any
    areaPath: any

    ngOnChanges(changes: SimpleChanges): void {

        console.log(this.color)
        this.x = this.x.range([this.bandwidth / 2, this.width + this.bandwidth / 2]);
        this.y = this.y.range([this.height, 0]);

        this.areaPath = area()
        .x((d: any) => this.x(d.name))
        .y0((d: any) => this.y(d.y0))
        .y1((d: any) => this.y(d.y1))

        this.x1 = '0%';
        this.x2 = '0%';
        this.y1 = '0%';
        this.y2 = '100%';

        this.stackedData = toStacked(this.data)

        this.gradientId = 'grad' + id().toString();
        this.gradientFill = `url(#${this.gradientId})`;
        this.gradientStops = this.getGradient()
    }

    getGradient() {
        return [
          {
            offset: 0,
            color: this.color,
            opacity: ".5"
          },
          {
            offset: 100,
            color: this.color,
            opacity: "0"
        }];
      }
  }
  