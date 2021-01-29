import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
  } from '@angular/core'; 
import * as d3Scale from "d3-scale";
import * as d3Array from "d3-array";
import uniq from 'lodash/uniq'
import { getBandwidth, getTicks, getMapData } from '../common/util'
import { colorWithMeaningPalette as colorPalette, dataVizColorPalette as colorPalette2 } from '../common/color-palette'

@Component({
    selector: 'FloatingBarChart',
    templateUrl: './floatingbarchart.component.html',
    styleUrls: ['./floatingbarchart.component.less'],
})
export class FloatingBarChartComponent implements OnChanges {
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
      this._styles = {  bar: value.bar == undefined? this._styles.bar 
                            : { width: value.bar.width == undefined? 30 : value.bar.width },
                        cap: value.cap == undefined? this._styles.cap 
                            : { height: value.cap.height == undefined? 2 : value.cap.height},
                        colors: value.colors == undefined?
                        [
                            colorPalette['MAX30'], 
                            colorPalette['KAI30'], 
                            colorPalette['MAX'], 
                            colorPalette['KAI'],
                        ]
                        : value.colors,
                        monoColors: value.monoColors == undefined?
                        [colorPalette2[4]]
                        : value.monoColors
                        }
    }
    private _styles = { bar: { width: 30 },
                        cap: { height: 2},
                        colors: [
                            colorPalette['MAX30'], 
                            colorPalette['KAI30'], 
                            colorPalette['MAX'], 
                            colorPalette['KAI'],
                        ],
                        monoColors: [colorPalette2[4]]
                        }
    // @Input() labels: any;
    @Input() xAxisTick: any = {rotate: 0, textAnchor: 'middle', fontSize: '11px'}
    @Input() xTickFormatter: Function
    @Input() yTickFormatter: Function
    @Input() xDomain: any
    @Input() yDomain: any = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    // @Input() toolTip: Function
    @Input() hideXAxis: boolean = false;
    @Input() hideYAxis: boolean = false;
    @Input() hideAxisPath: boolean = false;
    @Input() xGrid: boolean
    @Input() yGrid: boolean
    @Input() monoColor: boolean = false

    private x: any;
    private y: any;
    private _width: number;
    private _height: number;
    private _padding: any;
    private mapData: any;
    private xBandwidth: any;
    private yBandwidth: any;
    private xticks: any;
    private yticks: any;
    private _xDomain: any;
    private maxValue: number;
    private moveBarToCenter: number;

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {

        this.mapData = getMapData(this.data, this.dataMapper)

        this.maxValue = Math.max(this.data.map(i => i.value))

        this._xDomain = this.xDomain? this.xDomain : uniq(this.mapData.map(d => d.name))

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
        this.x.domain(this._xDomain);
        this.y.domain([0, d3Array.max(this.yDomain)]);
        
        this.xticks = this.xDomain? this.xDomain.length > 2 ? this.xDomain : getTicks(this.x) : getTicks(this.x)
        this.yticks = this.xDomain? this.yDomain.length > 2 ? this.yDomain : getTicks(this.y) : getTicks(this.y)
        
        this.xBandwidth = getBandwidth(this.xticks, this._width)

        this.yBandwidth = getBandwidth(this.yticks, this._height)

        this.xGrid = this.xGrid == undefined? this.pivot? false : true : this.xGrid
        this.yGrid = this.yGrid == undefined? this.pivot? true : false : this.yGrid
   
        this.moveBarToCenter = (this.pivot? this.yBandwidth : this.xBandwidth - this.styles.bar.width) / 2
    }
}
