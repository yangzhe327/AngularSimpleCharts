import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
  } from '@angular/core';
  import { colorWithMeaningPalette } from './color-palette'
  import { arc, pie } from 'd3-shape'
  
    @Component({
      selector: 'g[chart-donut]',
      template: `
        <svg:g 
        [attr.transform]="transform">
            <svg:path
            *ngFor="let item of pieData; let i=index;"
                class="arc"
                [attr.d]="path(i, item.startAngle, innerRadius, outerRadius, item.value, item.endAngle, 0.008)"
                [attr.fill]="fill[i % fill.length]"
            />
            <svg:text
            *ngIf="summary !== undefined"
                [attr.fill]="fontColor"
                [attr.font-size]="fontSize"
                [attr.transform]="fontTransform"
                text-anchor="middle"
            >
                {{summary}}
            </svg:text>
        </svg:g>
      `,
    })
    export class DonutComponent implements OnChanges {
        @Input() data: any
        @Input() styles: any
        @Input() width: number
        @Input() height: number
        @Input() radius: number
        @Input() summary: any
  
        _arc: any
        _pie: any
        pieData: any
        transform: string
        fontTransform: string
        outerRadius: number
        innerRadius: number
        fill: string
        fontSize: number
        fontColor: string

        ngOnChanges(changes: SimpleChanges): void {
            this.radius = this.radius == undefined ? Math.min(this.width, this.height) / 2 : this.radius
            this.fontSize = this.radius * 0.5
            this.transform = "translate(" + this.width / 2 + "," + this.height / 2 + ")";
            this.fontTransform = "translate(0," + this.fontSize * 0.33 + ")";
            this._arc = arc()
            this._pie = pie().value(i => i.value).sort(this.byOrder)//dot not omit this sort
            this.outerRadius = this.radius
            this.innerRadius = this.styles.donut.innerRadius == 0 ? this.radius * 0.85 : this.styles.donut.innerRadius
            this.fill =  this.styles.donut.colors
            this.pieData = this._pie(this.data)
            this.fontColor = (this.styles.summary && this.styles.summary.color) ? this.styles.summary.color : colorWithMeaningPalette.KIT
        }
        byOrder(a, b) {
            return a.order - b.order
        }
        path(i, startAngle, innerRadius, outerRadius, value, endAngle, padAngle) {
            return this._arc({ i, startAngle, innerRadius, outerRadius, value, endAngle, padAngle }, i)
        }
    }
    