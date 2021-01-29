import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
  } from '@angular/core';
import * as d3Scale from "d3-scale";
import * as d3Array from "d3-array";
import uniq from 'lodash/uniq'
import { dataVizColorPalette as colorPalette } from '../common/color-palette'
import { groups, getBandwidth, getTicks, getMapData, getMaxGroup } from '../common/util'

const linecolors = [
  colorPalette[4],
  colorPalette[7],
  colorPalette[1],
  colorPalette[10],
  colorPalette[2],
  colorPalette[3]
]

@Component({
    selector: 'LineChart',
    templateUrl: './linechart.component.html',
    styleUrls: ['./linechart.component.less'],
})
export class LineChartComponent implements OnChanges {
    @Input() data: any;
    @Input() dataMapper: any;
    // @Input() showValue: any;
    // @Input() events: any;
    @Input() pivot: boolean = false;
    @Input() width: number = 0;
    @Input() height: number = 0;
    @Input() padding: number = 40
    @Input() paddingTop: number;
    @Input() paddingRight: number;
    @Input() paddingBottom: number;
    @Input() paddingLeft: number;
    @Input()
    get styles(): any { return this._styles; }
    set styles(value: any) {
      this._styles = {  colors: value.colors == undefined? linecolors : value.colors
                        }
    }
    private _styles = { colors: linecolors
                        }
    // @Input() labels: any;
    @Input() xAxisTick: any = {rotate: 0, textAnchor: 'middle', fontSize: '11px'}
    @Input() xTickFormatter: Function
    @Input() yTickFormatter: Function
    @Input() xDomain: any
    @Input() yDomain: any
    // @Input() toolTip: Function
    @Input() hideXAxis: boolean = false;
    @Input() hideYAxis: boolean = false;
    @Input() hideAxisPath: boolean = false;
    @Input() xGrid: boolean = false;
    @Input() yGrid: boolean = false;
    @Input() area: boolean = false;
    @Input() legendArrangement: string = "right";
    @Input() legendData: Array<string>;

    private x: any;
    private y: any;
    private _width: number;
    private _height: number;
    private linePath: any;
    private areaPath: any;
    private groupData: any;
    private bandwidth: any;
    private ticks: any;
    private _padding: any;
    private decoratorComponent: string = "CircleUponLine"
    private mapData: any
    private _xDomain: any
    private colors: any

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        this.mapData = getMapData(this.data, this.dataMapper)

        this.paddingTop = this.paddingTop === undefined? this.padding : this.paddingTop
        this.paddingRight = this.paddingRight === undefined? this.padding : this.paddingRight
        this.paddingBottom = this.paddingBottom === undefined? this.padding : this.paddingBottom
        this.paddingLeft = this.paddingLeft === undefined? this.padding : this.paddingLeft

        this._padding = {
            top: this.paddingTop,
            right: this.paddingRight, 
            bottom: this.paddingBottom, 
            left: this.paddingLeft
        };

        this.width == 0? null : this.width
        this.height == 0? null : this.height
        this._width = this.width - (this._padding.left + this._padding.right);
        this._height = this.height - (this._padding.top + this._padding.bottom);

        this.x = d3Scale.scaleBand();
        this.y = d3Scale.scaleLinear();
        this.x.domain(this.mapData.map((d) => d.name));
        this.y.domain([0, d3Array.max(this.yDomain)]);

        this.ticks = this.xDomain? this.xDomain.length > 2 ? this.xDomain: getTicks(this.x) : getTicks(this.x)
        this.bandwidth = this.pivot? getBandwidth(this.ticks, this._height) : getBandwidth(this.ticks, this._width)

        this.groupData = groups(this.mapData, 'group', null)

        let maxGroup = getMaxGroup(this.groupData)
        let maxLength = maxGroup.length

        this._xDomain = maxGroup.slice(0, maxLength - 1).map((d) => d.name)
        this._xDomain = this.xDomain === undefined? this._xDomain: this.xDomain
    }
  }

