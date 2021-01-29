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
import { groups, getBandwidth, getTicks, getMapData, toStacked } from '../common/util'

const stackedbarcolors = [
    colorPalette[3],
    colorPalette[4],
    colorPalette[5],
    colorPalette[6],
    colorPalette[7],
    colorPalette[8],
    colorPalette[0],
    colorPalette[1],
    colorPalette[2],
    colorPalette[9],
    colorPalette[10],
    colorPalette[11]
]

@Component({
    selector: 'StackedBarChart',
    templateUrl: './stackedbarchart.component.html',
    styleUrls: ['./stackedbarchart.component.less'],
})
export class StackedBarChartComponent implements OnChanges {
    @Input() data: any;
    @Input() dataMapper: any;
    // @Input() showValue: any;
    // @Input() events: any;
    @Input() pivot: boolean = false;
    @Input() width: number = 0;
    @Input() height: number = 0;
    @Input() padding: number = 40;
    @Input() paddingTop: number;
    @Input() paddingRight: number;
    @Input() paddingBottom: number;
    @Input() paddingLeft: number;
    @Input()
    get styles(): any { return this._styles; }
    set styles(value: any) {
      this._styles = {  bar: value.bar == undefined? this._styles.bar 
                        : { width: value.bar.width == undefined? 20 : value.bar.width },
                        colors: value.colors == undefined? stackedbarcolors
                        : value.colors
                        }
    }
    private _styles = { bar: { width: 20 },
                        colors: stackedbarcolors
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
    @Input() legendArrangement: string = "right";
    @Input() legendData: Array<string>;

    private x: any;
    private y: any;
    private _width: number;
    private _height: number;
    private _padding: any;
    private groupData: any;
    private ticks: any;
    private bandwidth: number
    private moveBarToCenter: any
    private mapData: any
    private decoratorComponent: string = "Square"
    private _xDomain: any
    private scaleBand: any
    private scaleLinear: any

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        this.mapData = getMapData(this.data, this.dataMapper)

        this._xDomain = this.xDomain? this.xDomain : uniq(this.data.map(d => d.name))

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
        
        this.groupData = groups(toStacked(this.mapData), 'name', null)

        this.ticks = this.xDomain? this.xDomain.length > 2 ? this.xDomain: getTicks(this.x) : getTicks(this.x)
        
        this.bandwidth = this.pivot? getBandwidth(this.ticks, this._height) : getBandwidth(this.ticks, this._width)
    }
}
