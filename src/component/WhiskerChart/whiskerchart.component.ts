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
import { dataVizColorPalette as colorPalette } from '../common/color-palette'

@Component({
    selector: 'WhiskerChart',
    templateUrl: './whiskerchart.component.html',
    styleUrls: ['./whiskerchart.component.less'],
})
export class WhiskerChartComponent implements OnChanges {
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
      this._styles = {
                        whisker: value.whisker == undefined? this._styles.whisker 
                        : {
                            range: value.whisker.range == undefined? this._styles.whisker.range 
                            : {
                                length: value.whisker.range.length == undefined? 15 : value.whisker.range.length,
                                stroke: value.whisker.range.stroke == undefined? '#727272' : value.whisker.range.stroke,
                                strokeWidth: value.whisker.range.strokeWidth == undefined? 0.5 : value.whisker.range.strokeWidth,
                                strokeWidthII: value.whisker.range.strokeWidthII == undefined? 1 : value.whisker.range.strokeWidthII
                            },
                            rect: value.whisker.rect == undefined? this._styles.whisker.rect 
                            : {
                                length: value.whisker.rect.length == undefined? 10 : value.whisker.rect.length,
                                fill: value.whisker.rect.fill == undefined? colorPalette[7] : value.whisker.rect.fill
                            },
                            circle: value.whisker.circle == undefined? this._styles.whisker.circle 
                            : {
                                r: value.whisker.circle.r == undefined? 5 : value.whisker.circle.r,
                                fill: value.whisker.circle.fill == undefined? colorPalette[4] : value.whisker.circle.fill
                            }
                        },
                        legend: value.legend == undefined? this._styles.legend 
                        : {
                            width: value.legend.width == undefined? 10 : value.legend.width,
                            height: value.legend.height == undefined? 10 : value.legend.height,
                            colors: value.legend.colors == undefined? [colorPalette[4], colorPalette[7]] : value.legend.colors
                        }
                     }
    }
    private _styles = {     
                        whisker: {
                            range: {
                                length: 15,
                                stroke: '#727272',
                                strokeWidth: 0.5,
                                strokeWidthII: 1
                            },
                            rect: {
                                length: 10,
                                fill: colorPalette[7]
                            },
                            circle: {
                                r: 5,
                                fill: colorPalette[4]
                            }
                        },
                        legend: {
                            width: 10,
                            height: 10,
                            colors: [colorPalette[4], colorPalette[7]]
                        }
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
    @Input() legendArrangement: string = "right";
    @Input() legendData: Array<string> = ['Actual', 'Target'];

    private x: any;
    private y: any;
    private _width: number;
    private _height: number;
    private _padding: any;
    private mapData: any;
    private xBandwidth: any;
    private xticks: any;
    private yticks: any;
    private _xDomain: any;
    private _yDomain: any;
    private maxValue: number;
    private moveBarToCenter: number;
    private decoratorComponent: any = ['Actual', 'Target'];

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

        this.xGrid = this.xGrid == undefined? this.pivot? false : true : this.xGrid
        this.yGrid = this.yGrid == undefined? this.pivot? true : false : this.yGrid
        
        this.moveBarToCenter = this.xBandwidth / 2
    }
}
