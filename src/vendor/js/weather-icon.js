import { thereIsSun } from '@vendor/js/sun';

const ICON_MAP = new Map();
const BASE = 'icons/weather';

// sun
addIconMapping([0, 1], { path: '{sunOrMoon}.svg', name: 'clear sky' });
// cloud
addIconMapping([2], { path: 'cloud-{sunOrMoon}.svg', name: 'partly cloudy' });
addIconMapping([3], { path: 'cloud.svg', name: 'cloudy' });
// fog or smog
addIconMapping([45, 48], { path: 'smog.svg', name: 'fog, or smog' });
// drizzle
addIconMapping([51], { path: 'slight-rain.svg', name: 'slight drizzle' });
addIconMapping([53, 55], { path: 'moderate-rain.svg', name: 'drizzle' });
// freezed drizzle
addIconMapping([56], { path: 'slight-rain.svg', name: 'slight freezed drizzle' });
addIconMapping([57], { path: 'moderate-rain.svg', name: 'freezed drizzle' });
// rainy
addIconMapping([61], { path: 'slight-rain.svg', name: 'slight rain' });
addIconMapping([63], { path: 'moderate-rain.svg', name: 'moderate rain' });
addIconMapping([65], { path: 'heavy-rain.svg', name: 'heavy rain' });
// freezing rain
addIconMapping([66], { path: 'slight-rain.svg', name: 'slight freezed rain' });
addIconMapping([67], { path: 'heavy-rain.svg', name: 'heavy freezed rain' });
// snow
addIconMapping([71], { path: 'slight-snow.svg', name: 'silght snow' });
addIconMapping([73], { path: 'moderate-snow.svg', name: 'moderate snow' });
addIconMapping([75, 77], { path: 'heavy-snow.svg', name: 'heavy snow' });
// rain showers
addIconMapping([80], { path: 'slight-rain-showers-{sunOrMoon}.svg', name: 'slight rain showers' });
addIconMapping([81], { path: 'moderate-rain-showers-{sunOrMoon}.svg', name: 'moderate rain showers' });
addIconMapping([82], { path: 'heavy-rain-showers-{sunOrMoon}.svg', name: 'heavy rain showers' });
// snow showers
addIconMapping([85], { path: 'slight-snow-showers-{sunOrMoon}.svg', name: 'slight snow showers' });
addIconMapping([86], { path: 'heavy-snow-showers-{sunOrMoon}.svg', name: 'heavy snow showers' });
// thunderstorm
addIconMapping([95, 96, 99], { path: 'thunderstorm.svg', name: 'thunderstorm' });

function addIconMapping(values, givenIconInfo) {
    values.forEach((val) => {
        let onDayIconPath = `${BASE}/${givenIconInfo.path.replaceAll('{sunOrMoon}', 'sun')}`;
        let onNightIconPath = `${BASE}/${givenIconInfo.path.replaceAll('{sunOrMoon}', 'moon')}`;
        let onDayStaticIconPath = `${BASE}/static/${givenIconInfo.path.replaceAll('{sunOrMoon}', 'sun')}`;
        let onNightStaticIconPath = `${BASE}/static/${givenIconInfo.path.replaceAll('{sunOrMoon}', 'moon')}`;

        ICON_MAP.set(val, {
            onDay: {
                path: onDayIconPath,
                staticIconPath: onDayStaticIconPath,
                name: givenIconInfo.name,
            },
            onNight: {
                path: onNightIconPath,
                staticIconPath: onNightStaticIconPath,
                name: givenIconInfo.name,
            },
            getIconBasedOnDayOrNight: function (onDayjs) {
                if (thereIsSun({ lat: localStorage.lat, long: localStorage.long, onDayjs })) {
                    return this.onDay;
                }
                return this.onNight;
            },
        });
    });
}

export function icons() {
    return ICON_MAP;
}

export function iconOf(weatherCode) {
    if (weatherCode === null || weatherCode === undefined) {
        return ICON_MAP.get(0);
    }
    return ICON_MAP.get(weatherCode);
}
