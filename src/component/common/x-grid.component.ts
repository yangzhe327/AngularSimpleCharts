import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Axis from "d3-axis";

@Component({
  selector: 'g[chart-xgrid]',
  template: `
    <svg:g
      class="chart-xgrid">
    </svg:g>
  `
})
export class XGridComponent implements OnChanges {
  @Input() pivot: boolean = false;
  @Input() width
  @Input() height
  @Input() yDomain
  @Input() x
  @Input() y
  @Input() bandwidth

  path: any;

  ngOnChanges(changes: SimpleChanges): void {
      this.path = this.pivot? this.x.rangeRound([this.bandwidth / 2 , this.height + this.bandwidth / 2])
      : this.y.rangeRound([this.height, 0]);
      
      this.drawGrid();
  }

  private drawGrid() {
      d3.select("g.chart-xgrid")
      .call(this.pivot?
        d3Axis.axisLeft(this.path)
        .tickValues(this.yDomain)
        .tickSize(-this.width )
        .tickFormat("")
        : d3Axis.axisLeft(this.path)
        .tickValues(this.yDomain)
        .tickSize(-this.width)
        .tickFormat("")
      );
      d3.select("g.chart-xgrid")
      .selectAll("path").remove();
      d3.select("g.chart-xgrid")
      .selectAll("line")
      .attr("stroke", "#cdcdcd")
      .attr("stroke-width", 1);
  }
}
