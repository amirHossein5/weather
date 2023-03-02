import { setAttributes } from '@vendor/js/helpers';

export default class Chart {
    constructor({
        height,
        padding_bottom,
        border_width,
        fewest_entry,
        scale,
        hour_gap,
        first_line_position_x,
        topChartTextsFontSize,
        onePer,
    }) {
        this.height = height;
        this.padding_bottom = padding_bottom;
        this.border_width = border_width;
        this.fewest_entry = fewest_entry;
        this.scale = scale;
        this.hour_gap = hour_gap;
        this.first_line_position_x = first_line_position_x;
        this.topChartTextsFontSize = topChartTextsFontSize;
        this.onePer = onePer;
    }

    /**
     * Inserts chart into the selector.
     * @param  {[Number]} entries
     * @param {(HtmlNode chart, HtmlNode topChartBorder)} config is a closure function which has chart, topChartBorder path tags.
     * @return {Object}
     */
    draw(entries, selector, config) {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let chart = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let topChartBorder = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let positions = this.getEntriesPosittions(entries);
        let drawAttribute = this.getDrawAttribute(positions);

        chart.setAttribute(
            'd',
            this.closeDraw({
                draw: drawAttribute,
                entriesLength: entries.length,
            })
        );
        topChartBorder.setAttribute('d', drawAttribute);

        if (config != undefined) {
            config(chart, topChartBorder);
        }

        svg.append(topChartBorder);
        svg.append(chart);
        svg.append(this.getTopChartTexts(positions));
        selector.append(svg);
    }

    /**
     * Returns `g` tag which contains top chart texts.
     * @param  {[][Number x, Number y]} positions
     * @param  {Number} onePer: putting text one for given number. e.g, if onePer is `3`, then per 3 texts only one text will be add to svg
     * @return {HtmlNode}
     */
    getTopChartTexts(positions) {
        let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('font-size', this.topChartTextsFontSize);

        positions.forEach(([x, y], index) => {
            if (index % this.onePer != 0) {
                return;
            }

            let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.textContent = 2;

            setAttributes(text, [
                ['dy', -8],
                ['x', x],
                ['y', y],
                ['fill', '#a45e00'],
                ['stroke', '#a45e00'],
                ['stroke-width', '1'],
            ]);

            g.append(text);
        });

        return g;
    }

    /**
     * Returns value of `d` attribute of path tag.
     * @param  {[Number]} entries
     * @return {String}
     */
    getDrawAttribute(positions) {
        let draw = `M0 ${positions[0][1]}`;

        positions.forEach(([x, y]) => {
            draw += ` L${x} ${y}`;
        });

        return draw;
    }

    /**
     * Returns all positions of entries.
     * @param  {[Number]} entries
     * @return {[][String x, String y]}
     */
    getEntriesPosittions(entries) {
        let positions = [];

        entries.forEach((entry, index) => {
            let positionX = this.first_line_position_x + this.hour_gap * index;

            positions.push([positionX, this.getEntryPositionY(entry)]);
        });

        return positions;
    }

    /**
     * Closes the path draw with `z`.
     * @param  {String} draw
     * @return {String}
     */
    closeDraw({ draw, entriesLength }) {
        let lastLinePositionX = this.first_line_position_x + this.hour_gap * (entriesLength - 1);
        draw += ` L${lastLinePositionX} ${this.height} L0 ${this.height}`;
        return draw + ' Z';
    }

    /**
     * Calculate entry position
     *
     * pattern: 80−2−2−(19−2)×3
     * 80 is svg height, -2 is padding to bottom of chart, -2 is border width
     * 19 is temperature, -2 is fewest temperature
     * *3 is for giving more height to chart
     *
     * @param  {[Number]} entry
     * @return {[Number]}
     */
    getEntryPositionY(entry) {
        return this.height - this.padding_bottom - this.border_width - (entry - this.fewest_entry) * this.scale;
    }
}
