import dayjs from '@vendor/js/dayjs';
import { cloneObject } from '@vendor/js/helpers';
import * as weatherIcon from '@vendor/js/weather-icon';

export default function weatherResource(data) {
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
        datetime: dayjs.tz(data.current_weather.time * 1000),
        temperature: roundTemp(data.current_weather.temperature),
        apparentTemperature: roundTemp(data.hourly.apparent_temperature[0]),
        icon: weatherIcon.iconOf(data.current_weather.weathercode).getIconBasedOnDayOrNight(dayjs.tz()),
    };
}

function getHourlyWeather(data, ...sliceHours) {
    let hourlyArr = [];

    let sliceOfHours = sliceWeatherHours(data.hourly, ...sliceHours);

    sliceOfHours.time.forEach((timestamp, index) => {
        let dayjsDate = dayjs.tz(timestamp * 1000);
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

    data.daily.time.forEach((timestamp, index) => {
        dailyArr.push({
            day: dayjs.tz(timestamp * 1000),
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
    let currentTimeStamp = current_weather.time;

    for (let index in hourly.time) {
        let timestamp = hourly.time[index];

        if (timestamp !== currentTimeStamp) {
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
