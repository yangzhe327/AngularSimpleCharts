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
    selector: 'BubbleChart',
    templateUrl: './bubblechart.component.html',
    styleUrls: ['./bubblechart.component.less'],
})
export class BubbleChartComponent implements OnChanges {
    @Input() data: any;
    @Input() dataMapper: any;
    // @Input() showValue: any;
    // @Input() events: any;
    @Input() pivot: boolean = false;
    @Input() width: number = 0;
    @Input() height: number = 0;
    @Input() padding: number = 40
    @Input() paddingTop: number = 0;
    @Input() paddingRight: number = 0;
    @Input() paddingBottom: number = 0;
    @Input() paddingLeft: number = 0;
    @Input()
    get styles(): any { return this._styles; }
    set styles(value: any) {
        this._styles = {
            bubble: value.bubble == undefined ? this._styles.bubble
                : {
                    color: value.bubble.color == undefined ? colorPalette[4] : value.bubble.color,
                    opacity: value.bubble.opacity == undefined ? 0.5 : value.bubble.opacity
                }
        }
    };
    private _styles = {
        bubble: {
            color: colorPalette[4],
            opacity: 0.5
        }
    };
    // @Input() labels: any;
    @Input() xAxisTick: any = { rotate: 0, textAnchor: 'middle', fontSize: '11px' }
    @Input() xTickFormatter: Function = () => { };
    @Input() yTickFormatter: Function = () => { };
    @Input() xDomain: any;
    @Input() yDomain: any = [0, 20, 40, 60, 80, 100];
    // @Input() toolTip: Function
    @Input() hideXAxis: boolean = false;
    @Input() hideYAxis: boolean = false;
    @Input() hideAxisPath: boolean = false;
    @Input() xGrid: boolean = false;
    @Input() yGrid: boolean = false;

    private x: any;
    private y: any;
    private _width: number = 0;
    private _height: number = 0;
    private _padding: any;
    private mapData: any;
    private xBandwidth: any;
    private yBandwidth: any;
    private xticks: any;
    private yticks: any;
    private _xDomain: any;
    private _yDomain: any;
    private maxValue: number = 0;

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        this.mapData = getMapData(this.data, this.dataMapper)

        this.maxValue = Math.max(this.data.map((i: { value: any; }) => i.value))

        this._xDomain = this.xDomain ? this.xDomain : uniq(this.mapData.map((d: { name: any; }) => d.name))

        this.paddingTop = this.paddingTop === undefined ? this.padding : this.paddingTop
        this.paddingRight = this.paddingRight === undefined ? this.padding : this.paddingRight
        this.paddingBottom = this.paddingBottom === undefined ? this.padding : this.paddingBottom
        this.paddingLeft = this.paddingLeft === undefined ? this.padding : this.paddingLeft

        this._padding = {
            top: this.paddingTop,
            right: this.paddingRight,
            bottom: this.paddingBottom,
            left: this.paddingLeft
        };

        this.width == 0 ? null : this.width
        this.height == 0 ? null : this.height
        this._width = this.width - (this._padding.left + this._padding.right);
        this._height = this.height - (this._padding.top + this._padding.bottom);

        this.x = d3Scale.scaleLinear();
        this.y = d3Scale.scaleLinear();
        this.x.domain([0, d3Array.max(this._xDomain)]);
        this.y.domain([d3Array.max(this.yDomain), 0]);

        this.xticks = this.xDomain ? this.xDomain.length > 2 ? this.xDomain : getTicks(this.x) : getTicks(this.x)
        this.yticks = this.xDomain ? this.yDomain.length > 2 ? this.yDomain : getTicks(this.y) : getTicks(this.y)

        this.xBandwidth = getBandwidth(this.xticks, this._width)

        this.yBandwidth = getBandwidth(this.yticks, this._height)
    }
}
