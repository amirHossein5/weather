import axios from 'axios';

export default async function getCities(keyword) {
    if (!keyword || keyword === '') {
        return;
    }

    return axios
        .get('https://geocoding-api.open-meteo.com/v1/search?count=10', {
            params: {
                name: keyword,
            },
        })
        .then(({ data }) => {
            if (!('results' in data) || data.results.length === 0) {
                return [];
            }

            return data.results.map((city) => {
                return {
                    name: city.name,
                    latitude: city.latitude,
                    longitude: city.longitude,
                    timezone: city.timezone,
                    province: city.admin1,
                    countryIconUrl: `https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/${city.country_code.toLowerCase()}.svg`,
                };
            });
        });
}
