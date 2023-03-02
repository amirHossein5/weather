import Alpine from 'alpinejs';
import weatherChart from '@vendor/js/weather-chart';
import getCities from '@vendor/js/cities-api';
import alerts from '@vendor/js/alerts/alerts';
import { hasRequiredData, setLocalStorageData } from '@vendor/js/helpers';
import weatherOf from '@vendor/js/weather-api';

Alpine.start();
window.alerts = alerts;
window.getCities = getCities;
window.setLocalStorageData = setLocalStorageData;

let chart = weatherChart(document.querySelector('#weather-chart'));
chart.render();

if (hasRequiredData()) {
    weatherOf()
        .then((weather) => {
            console.log(weather);
            // previewWeatherData(weather)

            removeBlurred();
        })
        .catch((err) => {
            console.log(err);
            alerts().swal().mixin('error', 'Failed to get weather');

            setTimeout(function () {
                // localStorage.clear()
                // location.reload()
                console.log('reloading page');
            }, 3);
        });
} else {
    let locationForm = document.querySelector('#locationForm');

    locationForm.closest('.hidden').classList.remove('hidden');
    locationForm.querySelector('#cityInput').focus();
}

function removeBlurred() {
    document.querySelectorAll('.blurred').forEach((el) => {
        el.classList.remove('blurred');
    });
}

// const card = document.getElementById("card");
//test arrays: uncomment the array you would like to use and comment the rest otherwise you will get error
//const temps = [60, 20, 30, 50, 14, 22, 38, 54, 74, 98, 130, 84, 60, 96, 120, 156, 180, 98, 138, 100, 160, 90, 76, 30, 78, 118, 132, 88, 44];
//const temps = [180, 60, 90, 150, 42, 66, 114, 162, 222, 294, 390, 252, 180, 288, 360, 468, 540, 294, 414, 300, 480, 270, 228, 90, 234, 354, 396, 264, 132];
// const temps = [
//     120, 40, 60, 100, 28, 44, 76, 108, 148, 196, 260, 168, 120, 192, 240, 312, 360, 196, 276, 200, 320, 180, 152, 60,
//     156, 236, 2, 176, 88,
// ];
// const temps = [10, 8,7 ,6, 6,5 ,4, 3,2 ,2, 2,2 ,3, 4,5 ,6, 8,10 ,13, 14,15 ,16, 16, 15]

// const HEIGHT = 80;
// const PADDING_BOTTOM = 2;
// const BORDER_WIDTH = 2;
// const FEWEST_ENTRY = Math.min(...temps);
// const SCALE = 3;
// const HOUR_GAP = 17;
// const FIRST_LINE_POSITION_X = 13;
// const TOP_CHART_TEXTS_FONT_SIZE = 7
// const ONE_PER = 3

// new Chart({
//     height: HEIGHT,
//     padding_bottom: PADDING_BOTTOM,
//     border_width: BORDER_WIDTH,
//     fewest_entry: FEWEST_ENTRY,
//     scale: SCALE,
//     hour_gap: HOUR_GAP,
//     topChartTextsFontSize: TOP_CHART_TEXTS_FONT_SIZE,
//     first_line_position_x: FIRST_LINE_POSITION_X,
//     onePer: ONE_PER
// }).draw(temps, document.querySelector('[data-chart]'), (chart, topChartBorder) => {
//     chart.setAttribute('fill', 'rgba(255, 204, 0, 0.2)');

//     topChartBorder.setAttribute('fill', 'none');
//     topChartBorder.setAttribute('stroke', '#fc0')
//     topChartBorder.setAttribute('stroke-width', '2')
// });

// function dataVisualization(array, frequency, linecount) {
//     const svgElment = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//     const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
//     const days = array.length;
//     const maxVal = Math.max(...array);
//     const widthSvg = days * frequency;
//     const heightSvg = maxVal + 30;
//     const graphLine = maxVal / (linecount - 1);

//     svgElment.setAttributeNS(null, "width", widthSvg);
//     svgElment.setAttributeNS(null, "height", heightSvg);

//     // g tags for grouping other tags
//     const gElCircle = document.createElementNS("http://www.w3.org/2000/svg", "g");
//     gElCircle.id = "graph-points";

//     const gElLine = document.createElementNS("http://www.w3.org/2000/svg", "g");
//     gElLine.id = "graph-lines";

//     const gElText = document.createElementNS("http://www.w3.org/2000/svg", "g");
//     gElText.id = "graph-texts";

//     // base line
//     let pathString = "M" + widthSvg + " " + heightSvg + " L" + 0 + " " + widthSvg;

//     for (let d = 0; d < days; d++) {
//         const yValue = heightSvg - dataPath2[d], xValue = d * frequency;
//         const newString = " L" + xValue + " " + yValue;
//         pathString += newString;

//         const circleEl = document.createElementNS("http://www.w3.org/2000/svg", "circle");

//         circleEl.setAttributeNS(null, "cx", xValue);
//         circleEl.setAttributeNS(null, "cy", yValue);
//         circleEl.setAttributeNS(null, "r", "8");
//         circleEl.addEventListener("mouseover", (e) => {card.style = `top:${yValue}px; left:${xValue - 75}px; display: block;`;
// // generate date
// const date_ = new Date(Date.now() - ((days - d) * (24 * 60 * 60 * 1000))).toJSON().split("T")[0];
// card.innerHTML = `Views: ${dataPath2[d]} <br>Date: ${date_}`;});
// gElCircle.appendChild(circleEl);}

//     const ends = heightSvg - dataPath2[days - 1];
//     pathString += " L" + widthSvg + " " + ends;
//     pathString += " Z";
//     svgPath.setAttributeNS(null, "d", pathString);

//     // lines and texts
//     for (let l = 0; l < linecount; l++) {
//         const lineEl = document.createElementNS("http://www.w3.org/2000/svg", "line");
//         const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
//         const yPosition = heightSvg - (l * graphLine);
//         lineEl.setAttributeNS(null, "x1", "0");
//         lineEl.setAttributeNS(null, "y1", yPosition);
//         lineEl.setAttributeNS(null, "x2", widthSvg);
//         lineEl.setAttributeNS(null, "y2", yPosition);
//         gElLine.appendChild(lineEl);

//         const txt = l * graphLine;
//         textEl.setAttributeNS(null, "dx", "-20");
//         textEl.setAttributeNS(null, "x", widthSvg);
//         textEl.setAttributeNS(null, "y", yPosition);
//         textEl.textContent = txt;

//         gElText.appendChild(textEl);

//     }

//     svgElment.appendChild(gElCircle);
//     svgElment.appendChild(gElLine);
//     svgElment.appendChild(gElText);
//     svgElment.appendChild(svgPath);

//     // base parent or graph container
//     svgPathParent.appendChild(svgElment);
// }

// dataVisualization(dataPath2, 50, 3);
