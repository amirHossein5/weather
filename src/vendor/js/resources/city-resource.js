export function citiesResource(cities) {
    return cities.map((city) => {
        return cityResource(city);
    });
}

export function cityResource(city) {
    return {
        name: city.name,
        latitude: parseFloat(city.lat).toFixed(2),
        longitude: parseFloat(city.lon).toFixed(2),
        fullLat: city.lat,
        fullLong: city.lon,
        province: city.address?.state,
        countryIconUrl: `https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/${city.address?.country_code?.toLowerCase()}.svg`,
    };
}
