import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Axis from "d3-axis";
import * as d3Scale from "d3-scale";

@Component({
  selector: 'g[chart-ygrid]',
  template: `
      <svg:g
        class="chart-ygrid"
        [attr.transform]="transform">
      </svg:g>
    `
})
export class YGridComponent implements OnChanges {
  @Input() pivot: boolean = false;
  @Input() width: number = 0;
  @Input() height: number = 0;
  @Input() xDomain: any = [];
  @Input() yGrid: any;
  @Input() x: any;
  @Input() y: any;
  @Input() bandwidth: number = 0;
  @Input() isBand: boolean = true

  transform: string = "";
  path: any;

  ngOnChanges(changes: SimpleChanges): void {
    this.path = this.pivot ? this.y.rangeRound([0, this.width])
      : this.isBand ? this.x.range([this.bandwidth / 2, this.width + this.bandwidth / 2]) : this.x = this.x.rangeRound([0, this.width])

    this.transform = "translate(0," + this.height + ")";
    this.drawGrid();
  }

  private drawGrid() {
    d3.select("g.chart-ygrid")
      .call(this.pivot ?
        d3Axis.axisBottom(this.path)
          .tickValues(this.xDomain)
          .tickSize(-this.height)
          .tickFormat("")
        : d3Axis.axisBottom(this.path)
          .tickValues(this.xDomain)
          .tickSize(-this.height)
          .tickFormat("")
      )
    d3.select("g.chart-ygrid")
      .selectAll("path").remove();
    d3.select("g.chart-ygrid")
      .selectAll("line")
      .attr("stroke", "#cdcdcd")
      .attr("stroke-width", 1);
  }
}
