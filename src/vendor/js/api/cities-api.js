import { citiesResource } from '@vendor/js/resources/city-resource';
import axios from 'axios';

export default async function getCities(keyword) {
    if (!keyword || keyword === '') {
        return;
    }

    return axios
        .get('https://geocoding-api.open-meteo.com/v1/search?count=15', {
            params: {
                name: keyword,
            },
        })
        .then(({ data }) => {
            if (!('results' in data) || data.results.length === 0) {
                return [];
            }

            let cities = data.results.filter((city) => {
                return 'admin1' in city &&
                    'latitude' in city &&
                    'longitude' in city;
            });

            return citiesResource(cities);
        });
}
