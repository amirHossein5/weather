import alerts from '@vendor/js/alerts/alerts';
import weatherOf from '@vendor/js/api/weather-api';
import AreaChart from '@vendor/js/chart/area-chart';
import LineChart from '@vendor/js/chart/line-chart';
import { showFailedControlsSection } from '@vendor/js/failed-controls';
import {
    appendInAppropriateOrderAmongChilds,
    cloneObject,
    maxObjectValueOfKey,
    minObjectValueOfKey,
    setElementsData,
} from '@vendor/js/helpers';
import makeDraggable from '@vendor/js/make-draggable';
import * as pageLoading from '@vendor/js/page-loading';

let areaChartOptions = {
    responsiveHeight: {
        600: 300,
        560: 280,
        490: 250,
        470: 230,
        450: 190,
        400: 170,
        360: 130,
    },
    height: 350,
    width: 70,
    chartPathClasses: ['fill-[var(--chart-bg-color)]'],
    topChartPathClasses: ['stroke-[var(--chart-stroke-color)]'],
};

let lineChartOptions = {
    responsiveMaxHeight: {
        470: 170,
        450: 150,
        430: 130,
        400: 120,
        370: 100,
    },
    lineMaxHeight: 200,
    lineWidth: 24,
    lowTextClasses: ['text-[var(--coldest-degree-text-color)]'],
    highTextClasses: ['text-[var(--hottest-degree-text-color)]'],
    lineChartClasses: [
        'bg-gradient-to-t',
        'from-[var(--coldest-degree-text-color)]',
        'via-[#B0A850]',
        'to-[var(--hottest-degree-text-color)]',
    ],
    containerClasses: ['sm:gap-y-2', 'gap-y-1'],
};

export function showWeather() {
    pageLoading.show('loading...');

    weatherOf({ lat: localStorage.fullLat, long: localStorage.fullLong })
        .then((weather) => {
            showHiddenElements();
            fillWeatherData(weather);
            pageLoading.hide();
        })
        .catch((err) => {
            console.log(err);
            alerts().swal().mixin('error', 'Failed to get weather');
            pageLoading.hide();
            showFailedControlsSection();

            setTimeout(function () {
                location.reload();
            }, 10000);
        });
}

function showHiddenElements() {
    let hidedSelectors = ['header.hidden', 'main section.container.hidden', 'footer.hidden'];

    hidedSelectors.forEach((selector) => document.querySelector(selector).classList.remove('hidden'));
}

function fillWeatherData(weather) {
    fillCurrentWeather(weather.current);
    fillHoursData({
        hours: weather.recentLaterHours,
        onSelector: document.querySelector('#recent-later-hours'),
        draggableSelector: '#recent-later-hours',
        areaChartOptions: areaChartOptions,
    });
    fillDailySummaryWeather(weather.daily);
}

function fillCurrentWeather({ datetime, temperature, apparentTemperature, icon }) {
    setElementsData('current-weather-icon', (el) => addIconTo(el, icon));
    setElementsData('current-weather-temp', (el) => (el.innerHTML = temperature));
    setElementsData('current-weather-apparent-temp', (el) => (el.innerHTML = apparentTemperature));
}

function fillHoursData({ hours, onSelector, draggableSelector, areaChartOptions }) {
    let hourDataSection = onSelector;
    let templateSelector = hourDataSection.querySelector('template');
    const minTemp = minObjectValueOfKey('temperature', hours);
    const maxTemp = maxObjectValueOfKey('temperature', hours);
    let areaChart = new AreaChart(minTemp, maxTemp, areaChartOptions);

    hours.forEach((data, index) => {
        let template = templateSelector.content.cloneNode(true);
        let pTemp = getPreviousHour(hours, index).temperature;
        let nTemp = getNextHour(hours, index).temperature;
        let areaChartSvg = areaChart.draw(pTemp, data.temperature, nTemp);

        setElementsData('hourly-datetime', (el) => (el.innerHTML = data.datetime.format('H:mm')), template);
        setElementsData('hourly-icon', (el) => addStaticIconTo(el, data.icon), template);
        setElementsData('hourly-area-chart', (el) => el.append(areaChartSvg), template);
        setElementsData('hourly-temperature', (el) => (el.innerText = data.temperature), template);

        hourDataSection.append(template);
    });

    templateSelector.remove();
    if (draggableSelector !== undefined) {
        makeDraggable(draggableSelector);
    }
}

function fillDailySummaryWeather(days) {
    let dailySummarySection = document.querySelector('#daily-summary');
    let templateSelector = dailySummarySection.querySelector('template');
    const minTemp = minObjectValueOfKey('temperature_min', days);
    const maxTemp = maxObjectValueOfKey('temperature_max', days);
    let lineChart = new LineChart(minTemp, maxTemp, lineChartOptions);

    days.forEach((data, index) => {
        let template = templateSelector.content.cloneNode(true);
        let lineChartSvg = lineChart.draw(data.temperature_min, data.temperature_max);

        if (data.day.isToday()) {
            template.querySelector('[data-daily-summary-is-today]')?.classList.remove('hidden');
        }
        if (data.day.isTomorrow()) {
            template.querySelector('[data-daily-summary-is-tomorrow]')?.classList.remove('hidden');
        }

        setElementsData('daily-summary-week-day', (el) => addDateTo(el, data.day, 'ddd'), template);
        setElementsData('daily-summary-date', (el) => addDateTo(el, data.day, 'MMM D'), template);
        setElementsData('daily-summary-icon', (el) => addStaticIconTo(el, data.icon), template);
        setElementsData('daily-summary-line-chart', (el) => el.append(lineChartSvg), template);
        template.querySelector('[alpine-data]').setAttribute(
            'x-data',
            `{
            isActive: false,
            dayIndex: ${index},
        }`
        );

        dailySummarySection.append(template);
    });

    window.days = days;
    templateSelector.remove();
    makeDraggable('.daily-summary-draggable');
}

export function fillDayHoursData(day, dayIndex) {
    let dailyHoursSection = document.querySelector('#hours-of-day');
    let container = dailyHoursSection.querySelector('#hours-of-day-container');
    let templateSelector = dailyHoursSection.querySelector('template');
    let newAreaChartOptions = cloneObject(areaChartOptions);
    let template = templateSelector.content.cloneNode(true);

    newAreaChartOptions.height = 130;
    newAreaChartOptions.responsiveHeight = {
        360: 100,
    };

    template.querySelector('[day-index]').setAttribute('day-index', dayIndex);
    setElementsData('day-hours-date', (el) => addDateTo(el, day.day, 'MMMM DD - dddd'), template);
    fillHoursData({
        hours: day.hourly,
        onSelector: template.querySelector('div.day-hours'),
        areaChartOptions: newAreaChartOptions,
    });
    makeDraggable(undefined, template.querySelector('.day-hours-draggable'));

    appendInAppropriateOrderAmongChilds(container, template, dayIndex, 'day-index');
}

export function removeDayHoursData(dayIndex) {
    document.querySelector('#hours-of-day-container').querySelector(`div[day-index='${dayIndex}']`)?.remove();
}

function addStaticIconTo(el, icon) {
    el.src = icon.staticIconPath;
    addIconAttributesTo(el, icon);
}

function addIconTo(el, icon) {
    el.src = icon.path;
    addIconAttributesTo(el, icon);
}

function addIconAttributesTo(el, icon) {
    el.title = icon.name;
    el.alt = icon.name;
}

function getPreviousHour(hours, currentIndex) {
    let prevHour = hours[currentIndex - 1];
    if (prevHour === undefined) {
        prevHour = hours[currentIndex];
    }
    return prevHour;
}

function getNextHour(hours, currentIndex) {
    let nextHour = hours[currentIndex + 1];
    if (nextHour === undefined) {
        nextHour = hours[currentIndex];
    }
    return nextHour;
}

function addDateTo(el, date, format) {
    el.innerHTML = date.format(format);
}
