const ICON_MAP = new Map();
const BASE = 'icons/weather';

// static icons: icons without animations

addIconMapping([0, 1], { path: `${BASE}/sun.svg`, name: 'sunny', staticIconPath: `${BASE}/static/sun.svg` });
// cloud
addIconMapping([2], {
    path: `${BASE}/cloud-sun.svg`,
    name: 'partly cloudy',
    staticIconPath: `${BASE}/static/cloud-sun.svg`,
});
addIconMapping([3], { path: `${BASE}/cloud.svg`, name: 'cloudy', staticIconPath: `${BASE}/static/cloud.svg` });
// fog or smog
addIconMapping([45, 48], { path: `${BASE}/smog.svg`, name: 'fog, or smog', staticIconPath: `${BASE}/static/smog.svg` });
// drizzle
addIconMapping([51], {
    path: `${BASE}/slight-rain.svg`,
    name: 'slight drizzle',
    staticIconPath: `${BASE}/static/slight-rain.svg`,
});
addIconMapping([53, 55], {
    path: `${BASE}/moderate-rain.svg`,
    name: 'drizzle',
    staticIconPath: `${BASE}/static/moderate-rain.svg`,
});
// freezed drizzle
addIconMapping([56], {
    path: `${BASE}/slight-rain.svg`,
    name: 'slight freezed drizzle',
    staticIconPath: `${BASE}/static/slight-rain.svg`,
});
addIconMapping([57], {
    path: `${BASE}/moderate-rain.svg`,
    name: 'freezed drizzle',
    staticIconPath: `${BASE}/static/moderate-rain.svg`,
});
// rainy
addIconMapping([61], {
    path: `${BASE}/slight-rain.svg`,
    name: 'slight rain',
    staticIconPath: `${BASE}/static/slight-rain.svg`,
});
addIconMapping([63], {
    path: `${BASE}/moderate-rain.svg`,
    name: 'moderate rain',
    staticIconPath: `${BASE}/static/moderate-rain.svg`,
});
addIconMapping([65], {
    path: `${BASE}/heavy-rain.svg`,
    name: 'heavy rain',
    staticIconPath: `${BASE}/static/heavy-rain.svg`,
});
// freezing rain
addIconMapping([66], {
    path: `${BASE}/slight-rain.svg`,
    name: 'slight freezed rain',
    staticIconPath: `${BASE}/static/slight-rain.svg`,
});
addIconMapping([67], {
    path: `${BASE}/heavy-rain.svg`,
    name: 'heavy freezed rain',
    staticIconPath: `${BASE}/static/heavy-rain.svg`,
});
// snow
addIconMapping([71], {
    path: `${BASE}/slight-snow.svg`,
    name: 'silght snow',
    staticIconPath: `${BASE}/static/slight-snow.svg`,
});
addIconMapping([73], {
    path: `${BASE}/moderate-snow.svg`,
    name: 'moderate snow',
    staticIconPath: `${BASE}/static/moderate-snow.svg`,
});
addIconMapping([75, 77], {
    path: `${BASE}/heavy-snow.svg`,
    name: 'heavy snow',
    staticIconPath: `${BASE}/static/heavy-snow.svg`,
});
// rain showers
addIconMapping([80], {
    path: `${BASE}/slight-rain-showers.svg`,
    name: 'slight rain showers',
    staticIconPath: `${BASE}/static/slight-rain-showers.svg`,
});
addIconMapping([81], {
    path: `${BASE}/moderate-rain-showers.svg`,
    name: 'moderate rain showers',
    staticIconPath: `${BASE}/static/moderate-rain-showers.svg`,
});
addIconMapping([82], {
    path: `${BASE}/heavy-rain-showers.svg`,
    name: 'heavy rain showers',
    staticIconPath: `${BASE}/static/heavy-rain-showers.svg`,
});
// snow showers
addIconMapping([85], {
    path: `${BASE}/slight-snow-showers.svg`,
    name: 'slight snow showers',
    staticIconPath: `${BASE}/static/slight-snow-showers.svg`,
});
addIconMapping([86], {
    path: `${BASE}/heavy-snow-showers.svg`,
    name: 'heavy snow showers',
    staticIconPath: `${BASE}/static/heavy-snow-showers.svg`,
});
// thunderstorm
addIconMapping([95, 96, 99], {
    path: `${BASE}/thunderstorm.svg`,
    name: 'thunderstorm',
    staticIconPath: `${BASE}/static/thunderstorm.svg`,
});

function addIconMapping(values, iconInfo) {
    values.forEach((val) => {
        ICON_MAP.set(val, iconInfo);
    });
}

export function icons() {
    return ICON_MAP;
}

export function iconOf(weatherCode) {
    return ICON_MAP.get(weatherCode);
}
