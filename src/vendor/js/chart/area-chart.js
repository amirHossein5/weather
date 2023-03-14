import { bestMatchQuery, setAttributes } from '@vendor/js/helpers';

const PREVIOUS_INDEX = 0;
const CURRENT_INDEX = 1;
const NEXT_INDEX = 2;

export default class Chart {
    constructor(
        fewest_entry,
        biggest_entry,
        {
            responsiveHeight = {},
            height,
            width,
            padding_bottom = 0, // padding between lowest value and bottom of the chart
            top_stroke_width = 4, // top chart svg stroke
            chartBgColor,
            strokeColor,
            textColor,
            topChartPathClasses = [],
            chartPathClasses = [],
        }
    ) {
        height = bestMatchQuery(responsiveHeight, height);

        this.height = height;
        this.width = width;
        this.padding_bottom = padding_bottom;
        this.top_stroke_width = top_stroke_width;
        this.biggest_entry = biggest_entry;
        this.fewest_entry = fewest_entry;
        this.chartBgColor = chartBgColor;
        this.strokeColor = strokeColor;
        this.topChartPathClasses = topChartPathClasses;
        this.chartPathClasses = chartPathClasses;
    }

    /**
     * @param {Number} previous entry
     * @param {Number} current entry
     * @param {Number} next entry
     * @return {Object}
     */
    draw(previous, current, next) {
        previous = this.getRealPrevious(current, previous);
        next = this.getRealNext(current, next);

        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let topChartPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let drawAttribute = this.get_d_attribute_value(previous, current, next);

        path.classList.add(...this.chartPathClasses);
        topChartPath.classList.add(...this.topChartPathClasses);

        setAttributes(svg, [
            ['width', this.width],
            ['height', this.height],
        ]);
        setAttributes(path, [['d', this.closeDraw(drawAttribute)]]);
        setAttributes(topChartPath, [
            ['d', drawAttribute],
            ['fill', 'none'],
            ['stroke-width', this.top_stroke_width],
        ]);

        svg.append(topChartPath);
        svg.append(path);

        return svg;
    }

    /**
     * @param {Number} previousEntry entry
     * @param {Number} currentEntry entry
     * @param {Number} nextEntry entry
     * @return {String}
     */
    get_d_attribute_value(previousEntry, currentEntry, nextEntry) {
        let previousX = this.getEntryPositionX(PREVIOUS_INDEX, previousEntry);
        let previousY = this.getEntryPositionY(previousEntry);

        let currentX = this.getEntryPositionX(CURRENT_INDEX, currentEntry);
        let currentY = this.getEntryPositionY(currentEntry);

        let nextX = this.getEntryPositionX(NEXT_INDEX, nextEntry);
        let nextY = this.getEntryPositionY(nextEntry);

        let draw = `M ${previousX},${previousY} `;
        draw += `L ${currentX},${currentY} `;
        draw += `L ${nextX},${nextY}`;

        return draw;
    }

    /**
     * @param  {String} draw
     * @return {String}
     */
    closeDraw(draw) {
        let lastLinePositionX = this.getHourDistance() * NEXT_INDEX;
        return draw + ` L ${lastLinePositionX},${this.height} L 0,${this.height} Z`;
    }

    /**
     * @param  {[Number]} entry
     * @return {[Number]}
     */
    getEntryPositionY(entry) {
        let appropriateHeight = this.height - this.padding_bottom - this.top_stroke_width * 2; // decreasing height(space from bottom)
        return (
            this.top_stroke_width + // add space from top
            (this.biggest_entry - entry) * (appropriateHeight / (this.biggest_entry - this.fewest_entry))
        );
    }

    /**
     * @param  {Number} entry
     * @return {Number}
     */
    getEntryPositionX(index, entry) {
        return index * this.getHourDistance();
    }

    /**
     * @return {Number}
     */
    getHourDistance() {
        return Math.round(this.width / NEXT_INDEX);
    }

    /**
     * @param  {Number} current
     * @param  {Number} previous
     * @return {Number}
     * Returns real previous position, for start of chart can be connected to end of previous chart.
     */
    getRealPrevious(current, previous) {
        if (previous === current) return current;

        let distance = Math.abs(current - previous);

        if (previous < current) {
            return previous + distance / 2;
        }

        return previous - distance / 2;
    }

    /**
     * @param  {Number} current
     * @param  {Number} previous
     * @return {Number}
     * Returns real next position, for end of chart can be connected to start of next chart.
     */
    getRealNext(current, next) {
        if (next === current) return current;

        let distance = Math.abs(current - next);

        if (next < current) {
            return next + distance / 2;
        }

        return next - distance / 2;
    }
}
