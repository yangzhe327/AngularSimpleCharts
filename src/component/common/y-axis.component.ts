import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Axis from "d3-axis";

  @Component({
    selector: 'g[chart-yAxis]',
    template: `
      <svg:g
        class="chart-yAxis"
        [attr.font-family] = "dinnext"
        [attr.font-size.px] = "11">
      </svg:g>
    `
  })
  export class YAxisComponent implements OnChanges {
    @Input() pivot: boolean = false;
    @Input() width
    @Input() height
    @Input() domain
    @Input() hideAxisPath
    @Input() yTickFormatter
    @Input() x
    @Input() y
    @Input() isBand: boolean = true

    trans: number;
    path: any;
  
    ngOnChanges(changes: SimpleChanges): void {
        this.path = this.pivot? this.x.rangeRound([0, this.height])
        : this.isBand? this.y.rangeRound([this.height, 0]) : this.y.rangeRound([0, this.height])
        
        this.trans = this.pivot? this.width : this.height;
        this.drawAxis();
    }
  
    private drawAxis() {
        d3.select("g.chart-yAxis")
        .call(this.pivot? 
            d3Axis.axisLeft(this.path)
                .tickSize(0)
                .tickPadding(12)
                .tickValues(this.domain)
                .tickFormat(this.yTickFormatter)
            : d3Axis.axisLeft(this.path)
                .tickSize(0)
                .tickPadding(12)
                .tickValues(this.domain)
                .tickFormat(this.yTickFormatter)
        )
        d3.select("g.chart-yAxis")
        .selectAll("path")
        .attr("stroke", this.hideAxisPath?"none":"#cdcdcd")
        .attr("stroke-width", 1);
        d3.select("g.chart-yAxis")
        .selectAll("text")
        .attr("fill", "#727272")
        .style("user-select", "none");
        d3.select("g.chart-yAxis").selectAll("line").remove();
    }
  
  }
  