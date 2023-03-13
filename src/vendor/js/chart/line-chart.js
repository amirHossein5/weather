import {bestMatchQuery} from '@vendor/js/helpers'

export default class Chart {
    constructor(fewest_entry, biggest_entry, {
        responsiveMaxHeight = {},
        lineMaxHeight, // just number - it'll be converted to `px`
        lineWidth, // just number - it'll be converted to `px`
        containerClasses = [],
        lineChartClasses = [],
        lowTextClasses = [],
        highTextClasses = [],
    }) {
        lineMaxHeight = bestMatchQuery(responsiveMaxHeight, lineMaxHeight)

        this.lineMaxHeight = lineMaxHeight;
        this.lineWidth = lineWidth;
        this.biggest_entry = biggest_entry;
        this.fewest_entry = fewest_entry;

        this.containerClasses = containerClasses;
        this.lowTextClasses = lowTextClasses;
        this.highTextClasses = highTextClasses;
        this.lineChartClasses = lineChartClasses;
    }

    /**
     * Skeleton:
     * <div>               // container
     *     <p></p>         // lowText
     *     <div></div>     // lineChart
     *     <p></p>         // highText
     * </div>
     *
     * @param {Number} low entry
     * @param {Number} high entry
     * @return {Object}
     */
    draw(low, high) {
        if (low > high) {
            let lowParam = low;
            low = high;
            high = lowParam;
        }

        let container = document.createElement('div');
        let spaceFromTop = this.getSpaceFromTop(high); // space from top
        container.classList.add('flex', 'flex-col', 'items-center', ...this.containerClasses);
        container.style.paddingTop = `${spaceFromTop}px`

        let lineChart = document.createElement('div');
        let lineChartHeight = this.getLineChartHeight(low, high); // space from bottom
        lineChart.style.width = `${this.lineWidth}px`
        lineChart.style.height = `${lineChartHeight}px`
        lineChart.style.maxHeight = `${this.lineMaxHeight}px`;
        lineChart.style.backgroundSize = this.getLineChartBgSize();
        lineChart.style.backgroundPosition = this.getLineChartBgPosition(spaceFromTop);
        lineChart.classList.add('rounded-full', 'bg-red-100', ...this.lineChartClasses);

        let lowText = document.createElement('p');
        lowText.classList.add('font-extrabold', 'text-sm', ...this.lowTextClasses);
        lowText.innerHTML = `${low}&deg;`;

        let highText = document.createElement('p');
        highText.classList.add('font-extrabold', 'text-sm', ...this.highTextClasses);
        highText.innerHTML = `${high}&deg;`;

        container.append(highText);
        container.append(lineChart);
        container.append(lowText);

        return container;
    }

    /**
     * @return {String}
     */
    getLineChartBgSize() {
        return `${this.lineWidth}px ${this.lineMaxHeight}px`;
    }

    /**
     * @param  {Number} chartSpaceFromTop
     * @return {String}
     */
    getLineChartBgPosition(chartSpaceFromTop) {
        return `0px ${this.lineMaxHeight-chartSpaceFromTop}px`
    }

    /**
     * @param  {Number} low
     * @param  {Number} high
     * @return {Number}
     */
    getLineChartHeight(low, high) {
        if (high === low) return '2'
        return (high-low) * (this.lineMaxHeight / (this.biggest_entry - this.fewest_entry));
    }

    /**
     * @param  {Number} high number
     * @return {Number}
     */
    getSpaceFromTop(high) {
        return (this.biggest_entry - high) * (this.lineMaxHeight / (this.biggest_entry - this.fewest_entry));
    }
}
