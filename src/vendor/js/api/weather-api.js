import axios from 'axios';
import weatherResource from '@vendor/js/resources/weather-resource';

const apiUrl =
    'https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timeformat=unixtime&forecast_days=9&current_weather=true';

export default async function weatherOf({ lat, long, timezone }) {
    return axios
        .get(apiUrl, {
            params: {
                latitude: lat,
                longitude: long,
                timezone: timezone,
            },
        })
        .then(({ data }) => {
            return weatherResource(data);
        });
}
