import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
  } from '@angular/core'; 
import { getMapData } from '../common/util'
import {coerceNumberProperty} from '@angular/cdk/coercion';
import { dataVizColorPalette, colorWithMeaningPalette } from '../common/color-palette'

const defaulColors = [...dataVizColorPalette, ...Object.values(colorWithMeaningPalette)]

@Component({
    selector: 'DonutPercentageChart',
    templateUrl: './donutpercentagechart.component.html',
    styleUrls: ['./donutpercentagechart.component.less'],
})
export class DonutPercentageChartComponent implements OnChanges {
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
      this._styles = {  donut: value.donut == undefined? this._styles.donut 
                        : { 
                            innerRadius: value.donut.innerRadius == undefined? 0 : value.donut.innerRadius,
                            colors: value.donut.colors == undefined? defaulColors : value.donut.colors,
                            },
                        summary: value.summary == undefined? this._styles.summary 
                        : { color: value.summary.color == undefined? defaulColors[0] : value.summary.color }
                    }
    }
    private _styles = {
                        donut: {
                            innerRadius: 0,
                            colors: defaulColors
                        },
                        summary: { color: defaulColors[0] }
                    }
    @Input() legendData: Array<string>;
    @Input() value: any
    @Input() colors: any
    // @Input() labels: any;
    // @Input() toolTip: Function

    private _width: number;
    private _height: number;
    private _padding: any;
    private mapData: any;

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        this.styles.donut.colors = this.colors == undefined? this.styles.donut.colors : this.colors
        this.styles.summary.colors = this.colors == undefined? this.styles.summary.colors : this.colors
        let _data_array = []
        _data_array.push(this.value)
        let data = [];
        let remaining = 100;
        _data_array.map((datum, index) => {
            let d = Object.assign({}, { order: index, value: datum })
            data.push(d);
            remaining = remaining - datum;
        })
        if (remaining > 0) {
            let d = Object.assign({}, { order: _data_array.length + 1, value: remaining })
            data.push(d);
            this.styles.donut.colors = this.styles.donut.colors.slice(0, data.length - 1)
            this.styles.donut.colors.push(colorWithMeaningPalette.KIT)
        }

        this.mapData = getMapData(data, this.dataMapper)

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
        
        this.value = this.value + "%"
   }
}
