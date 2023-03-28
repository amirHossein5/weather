import { empty, isNotEmpty } from '@vendor/js/helpers';
import { citiesResource } from '@vendor/js/resources/city-resource';
import axios from 'axios';
import { uniqBy } from 'lodash';

export default async function getCities(keyword) {
    if (empty(keyword)) {
        return;
    }

    return axios
        .get('https://nominatim.openstreetmap.org/search.php?&limit=10&format=jsonv2&addressdetails=1', {
            params: {
                city: keyword,
            },
        })
        .then(({ data }) => {
            if (data.length === 0) {
                return [];
            }

            let cities = data.filter((city) => {
                return 'lat' in city && isNotEmpty(city.lat) && 'lon' in city && isNotEmpty(city.lon);
            });

            cities.map((city) => (city.name = cities[0].display_name.split(',')[0]));

            return uniqBy(citiesResource(cities), 'latitude');
        });
}
