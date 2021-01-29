import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Axis from "d3-axis";

  @Component({
    selector: 'g[chart-xAxis]',
    template: `
      <svg:g
        class="chart-xAxis"
        [attr.transform]="transform"
        [attr.font-family] = "dinnext"
        [attr.font-size] = "xAxisTick.fontSize"
        [attr.text-anchor] = "xAxisTick.textAnchor">
      </svg:g>
    `
  })
  export class XAxisComponent implements OnChanges {
    @Input() pivot: boolean = false;
    @Input() width
    @Input() height
    @Input() domain
    @Input() hideAxisPath
    @Input() xAxisTick
    @Input() xTickFormatter
    @Input() x
    @Input() y

    transform: string;
    path: any;
  
    ngOnChanges(changes: SimpleChanges): void {
        this.path = this.pivot? this.y.range([0, this.width])
        : this.x.range([0 , this.width]);

        this.transform = "translate(0," + this.height + ")";

        this.drawAxis();
    }
  
    private drawAxis() {
        d3.select("g.chart-xAxis")
        .call(this.pivot? 
            d3Axis.axisBottom(this.path)
                .tickSize(0)
                .tickPadding(12)
                .tickValues(this.domain)
                .tickFormat(this.xTickFormatter) 
            : d3Axis.axisBottom(this.path)
                .tickSize(0)
                .tickPadding(12)
                .tickValues(this.domain)
                .tickFormat(this.xTickFormatter)
        )
        d3.select("g.chart-xAxis")
        .selectAll("path")
        .attr("stroke", this.hideAxisPath?"none":"#cdcdcd")
        .attr("stroke-width", 1);
        d3.select("g.chart-xAxis")
        .selectAll("text")
        .attr("fill", "#727272")
        .attr("transform", `rotate(${this.xAxisTick.rotate})`)
        .style("user-select", "none")
        d3.select("g.chart-xAxis").selectAll("line").remove();
      
    }
  
  }
  