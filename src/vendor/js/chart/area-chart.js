import { setAttributes, bestMatchQuery } from '@vendor/js/helpers';

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
            border_width = 4, // top chart border
            chartBgColor,
            strokeColor,
            textColor,
            topChartPathClasses = [],
            chartPathClasses = [],
        }
    ) {
        height = bestMatchQuery(responsiveHeight, height)

        this.height = height;
        this.width = width;
        this.padding_bottom = padding_bottom;
        this.border_width = border_width;
        this.biggest_entry = biggest_entry;
        this.fewest_entry = fewest_entry;
        this.chartBgColor = chartBgColor;
        this.strokeColor = strokeColor;
        this.topChartPathClasses = topChartPathClasses
        this.chartPathClasses = chartPathClasses;
    }

    /**
     * Returns svg based on given points
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
        let drawAttribute = this.getDrawAttribute(previous, current, next);

        path.classList.add(...this.chartPathClasses)
        topChartPath.classList.add(...this.topChartPathClasses)

        setAttributes(svg, [
            ['width', this.width],
            ['height', this.height],
        ]);
        setAttributes(path, [
            ['d', this.closeDraw(drawAttribute)],
        ]);
        setAttributes(topChartPath, [
            ['d', drawAttribute],
            ['fill', 'none'],
            ['stroke-width', this.border_width],
        ]);

        svg.append(topChartPath);
        svg.append(path);

        return svg;
    }

    /**
     * Returns value of `d` attribute of path tag.
     * @param {Number} previousEntry entry
     * @param {Number} currentEntry entry
     * @param {Number} nextEntry entry
     * @return {String}
     */
    getDrawAttribute(previousEntry, currentEntry, nextEntry) {
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
     * Closes the path draw with `z` and completes the shape.
     * @param  {String} draw
     * @return {String}
     */
    closeDraw(draw) {
        let lastLinePositionX = this.getHourDistance() * NEXT_INDEX;
        return draw + ` L ${lastLinePositionX},${this.height} L 0,${this.height} Z`;
    }

    /**
     * Calculate entry position Y.
     * pattern: (biggest_entry - entry) * (height / (biggest_entry - fewest_entry))
     * also add border_width
     *
     * @param  {[Number]} entry
     * @return {[Number]}
     */
    getEntryPositionY(entry) {
        let appropriateHeight = this.height - this.padding_bottom - this.border_width * 2; // decreasing height(space from bottom)
        return (
            this.border_width + // add space from top
            (this.biggest_entry - entry) * (appropriateHeight / (this.biggest_entry - this.fewest_entry))
        );
    }

    /**
     * Returns entry's x position.
     * @param  {Number} entry
     * @return {Number}
     */
    getEntryPositionX(index, entry) {
        return index * this.getHourDistance();
    }

    /**
     * Returns hour distance based on width of chart
     * @return {Number}
     */
    getHourDistance() {
        return Math.round(this.width / NEXT_INDEX);
    }

    /**
     * Returns real previous position, to start of chart can be connected to end of previous chart.
     * @param  {Number} current
     * @param  {Number} previous
     * @return {Number}
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
     * Returns real next position, to end of chart can be connected to start of next chart.
     * @param  {Number} current
     * @param  {Number} previous
     * @return {Number}
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
