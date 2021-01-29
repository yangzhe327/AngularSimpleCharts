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
    selector: 'ColumnPercentageChart',
    templateUrl: './columnpercentagechart.component.html',
    styleUrls: ['./columnpercentagechart.component.less'],
})
export class ColumnPercentageChartComponent implements OnChanges {
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
    @Input() yGrid: boolean = false;
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
        this.mapData = this.getData(this.mapData)
        
        this._xDomain = this.xDomain? this.xDomain : uniq(this.data.map(d => d.name))
        this.yDomain = this.yDomain? this.yDomain : [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

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

    getData(data) {
        data = this.flatTwoDimensionArray(data)
        data = this.toPercentageArray(data)
        return data
    }

    flatTwoDimensionArray(data) {
        let result = []
        data.forEach(i => {
            if (Array.isArray(i)) {
                result = result.concat(i)
            }
            else {
                result.push(i)
            }
        })
        return result
    }

    toPercentageArray(data) {
        let names = uniq(data.map(d => d.name)),
            reducer = (accumulator, current) => accumulator + current.value,
            result = [],
            sumMap = {}
    
        names.forEach(name => {
            let sum = data.filter(d => d.name === name).reduce(reducer, 0)
            sumMap[name] = sum
        })
    
        result = data.map(d => {
            return { ...d, value: d.value / sumMap[d.name] * 100 }
        })
    
        return result
    }
}
