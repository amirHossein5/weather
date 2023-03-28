import * as Dayjs from '@vendor/js/dayjs';
import { cloneObject } from '@vendor/js/helpers';
import * as weatherIcon from '@vendor/js/weather-icon';

var dayjs;

export default function weatherResource(data) {
    dayjs = Dayjs.tz(data.timezone);

    return {
        current: getCurrentWeather(removePastHours(data)),
        recentLaterHours: getHourlyWeather(removePastHours(data), 0, 25),
        daily: getDailyWeather(data),
    };
}

/**
 * @param  {Object} data
 * @return {Object}
 */
function getCurrentWeather(data) {
    return {
        datetime: dayjs(data.current_weather.time),
        temperature: roundTemp(data.current_weather.temperature),
        apparentTemperature: roundTemp(data.hourly.apparent_temperature[0]),
        icon: weatherIcon.iconOf(data.current_weather.weathercode).getIconBasedOnDayOrNight(dayjs(data.current_weather.time)),
    };
}

function getHourlyWeather(data, ...sliceHours) {
    let hourlyArr = [];

    let sliceOfHours = sliceWeatherHours(data.hourly, ...sliceHours);

    sliceOfHours.time.forEach((time, index) => {
        let dayjsDate = dayjs(time);
        hourlyArr.push({
            datetime: dayjsDate,
            temperature: roundTemp(sliceOfHours.temperature_2m[index]),
            icon: weatherIcon.iconOf(sliceOfHours.weathercode[index]).getIconBasedOnDayOrNight(dayjsDate),
        });
    });

    return hourlyArr;
}

/**
 * @param  {Object} data
 * @return {Object}
 */
function getDailyWeather(data) {
    let dailyArr = [];

    data.daily.time.forEach((time, index) => {
        dailyArr.push({
            day: dayjs(time),
            temperature_min: roundTemp(data.daily.temperature_2m_min[index]),
            temperature_max: roundTemp(data.daily.temperature_2m_max[index]),
            icon: weatherIcon.iconOf(data.daily.weathercode[index]).onDay,
            hourly: getHourlyWeather(data, index * 24, index * 24 + 24),
        });
    });

    return dailyArr;
}

/**
 * @param  {Object} data
 * @return {Object}
 */
function removePastHours(data) {
    let currentHourIndex = getCurrentHourIndex({ hourly: data.hourly, current_weather: data.current_weather });
    let newData = Object.assign({}, data);

    newData.hourly = {
        time: data.hourly.time.slice(currentHourIndex),
        temperature_2m: data.hourly.temperature_2m.slice(currentHourIndex),
        apparent_temperature: data.hourly.apparent_temperature.slice(currentHourIndex),
        weathercode: data.hourly.weathercode.slice(currentHourIndex),
    };

    return newData;
}

/**
 * @param  {Object} hourlyData
 * @return {Number}
 */
function getCurrentHourIndex({ hourly, current_weather }) {
    let currentTime = current_weather.time;

    for (let index in hourly.time) {
        let time = hourly.time[index];

        if (time < currentTime) {
            continue;
        }

        return index;
    }

    return 0;
}

function roundTemp(temperature) {
    let rounded = Math.round(temperature);

    if (rounded === -0) {
        rounded = 0;
    }

    return rounded;
}

function sliceWeatherHours(weatherHours, ...sliceHours) {
    let sliceOfHours = cloneObject(weatherHours);

    Object.entries(sliceOfHours).forEach(([key, value]) => {
        sliceOfHours[key] = sliceOfHours[key].slice(...sliceHours);
    });

    return sliceOfHours;
}
