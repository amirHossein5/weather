export function citiesResource(cities) {
    return cities.map((city) => {
        return cityResource(city);
    });
}

export function cityResource(city) {
    return {
        name: city.name,
        latitude: city.latitude,
        longitude: city.longitude,
        timezone: city.timezone,
        province: city.admin1,
        countryIconUrl: `https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/${city.country_code.toLowerCase()}.svg`,
    };
}
