const legendHeight = (decoratorHeight, legendData) => decoratorHeight * 2 * legendData.length - decoratorHeight

const atRight = {
    legendX: (chartWidth, chartHeight, decoratorWidth, decoratorHeight, index, legendData) => chartWidth + 25,
    legendY: (chartWidth, chartHeight, decoratorWidth, decoratorHeight, index, legendData) => index * decoratorHeight * 2 + chartHeight / 2 - legendHeight(decoratorHeight, legendData) / 2
}

const atBottom = {
    legendX: (chartWidth, chartHeight, decoratorWidth, decoratorHeight, index, legendData) => {
        let rowsCount = Math.ceil(legendData.length / 2)
        let columnIndex = Math.floor(index / rowsCount)
        return columnIndex === 0 ? 0 + chartWidth / 2 * .2 : chartWidth / 2 + chartWidth / 2 * .2
    },
    legendY: (chartWidth, chartHeight, decoratorWidth, decoratorHeight, index, legendData) => {
        let rowsCount = Math.ceil(legendData.length / 2)
        let remain = (index + 1) % rowsCount
        return chartHeight + 40 + (
            remain === 0 ? decoratorHeight * 2 * (rowsCount - 1) : decoratorHeight * 2 * (remain - 1)
        )
    }
}

export const legendPresetArrangement = {
    'right': atRight,
    'bottom': atBottom
}


const margin = 20

const statusLegendHeight = (decoratorHeight, legendData) => (decoratorHeight + margin) * legendData.length - margin

const legendPreset = {
    legendX: (chartWidth, chartHeight, decoratorWidth, decoratorHeight, index, legendData) => chartWidth + 20,
    legendY: (chartWidth, chartHeight, decoratorWidth, decoratorHeight, index, legendData) => index * (decoratorHeight + margin) + chartHeight / 2 - statusLegendHeight(decoratorHeight, legendData) / 2
}

export { legendPreset }