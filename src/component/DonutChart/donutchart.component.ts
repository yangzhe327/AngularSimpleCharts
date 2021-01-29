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
import { dataVizColorPalette } from '../common/color-palette'

const colors = [
    dataVizColorPalette[3],
    dataVizColorPalette[4],
    dataVizColorPalette[5],
    dataVizColorPalette[6],
    dataVizColorPalette[7],
    dataVizColorPalette[8],
    dataVizColorPalette[0],
    dataVizColorPalette[1],
    dataVizColorPalette[2],
    dataVizColorPalette[9],
    dataVizColorPalette[10],
    dataVizColorPalette[11]
]

@Component({
    selector: 'DonutChart',
    templateUrl: './donutchart.component.html',
    styleUrls: ['./donutchart.component.less'],
})
export class DonutChartComponent implements OnChanges {
    @Input() data: any;
    @Input() dataMapper: any;
    // @Input() showValue: any;
    // @Input() events: any;
    @Input() pivot: boolean = false;
    @Input() width: number = 300;
    @Input() height: number = 300;
    @Input() padding: number = 40
    @Input() paddingTop: number;
    @Input() paddingRight: number;
    @Input() paddingBottom: number;
    @Input() paddingLeft: number;
    @Input()
    get styles(): any { return this._styles; }
    set styles(value: any) {
      this._styles = {  legend: value.legend == undefined? this._styles.legend 
                            : { 
                            width: value.legend.width == undefined? 10 : value.legend.width,
                            height: value.legend.height == undefined? 10 : value.legend.height,
                            colors: value.legend.colors == undefined? colors : value.legend.colors  
                            },
                        donut: value.donut == undefined? this._styles.donut 
                        : { 
                            innerRadius: value.legend.innerRadius == undefined? 0 : value.legend.innerRadius,
                            colors: value.legend.colors == undefined? colors : value.legend.colors,
                            },
                    }
    }
    private _styles = {
                        legend: {
                            width: 10,
                            height: 10,
                            colors: colors
                        },
                        donut: {
                            innerRadius: 0,
                            colors: colors
                        }
                    }
    @Input() legendArrangement: string = "right";
    @Input() legendData: Array<string>;
    // @Input() labels: any;
    // @Input() toolTip: Function

    private _width: number;
    private _height: number;
    private _padding: any;
    private mapData: any;
    private radius: number
    private decoratorComponent: string = "Square"

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
        
   }
}
