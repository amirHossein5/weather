import axios from 'axios';

export async function getTimezoneOf({ lat, long }) {
    return axios
        .get('https://api.open-meteo.com/v1/forecast?timezone=auto', {
            params: {
                latitude: lat,
                longitude: long,
            },
        })
        .then(({ data }) => {
            return data.timezone;
        });
}
