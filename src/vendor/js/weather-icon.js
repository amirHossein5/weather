const ICON_MAP = new Map();

// static icons: icons without animations

addIconMapping([0, 1], { path: 'icons/sun.svg', name: 'sunny', staticIconPath: 'icons/static/sun.svg' });
// cloud
addIconMapping([2], {
    path: 'icons/cloud-sun.svg',
    name: 'partly cloudy',
    staticIconPath: 'icons/static/cloud-sun.svg',
});
addIconMapping([3], { path: 'icons/cloud.svg', name: 'cloudy', staticIconPath: 'icons/static/cloud.svg' });
// fog or smog
addIconMapping([45, 48], { path: 'icons/smog.svg', name: 'fog, or smog', staticIconPath: 'icons/static/smog.svg' });
// drizzle
addIconMapping([51], {
    path: 'icons/slight-rain.svg',
    name: 'slight drizzle',
    staticIconPath: 'icons/static/slight-rain.svg',
});
addIconMapping([53, 55], {
    path: 'icons/moderate-rain.svg',
    name: 'drizzle',
    staticIconPath: 'icons/static/moderate-rain.svg',
});
// freezed drizzle
addIconMapping([56], {
    path: 'icons/slight-rain.svg',
    name: 'slight freezed drizzle',
    staticIconPath: 'icons/static/slight-rain.svg',
});
addIconMapping([57], {
    path: 'icons/moderate-rain.svg',
    name: 'freezed drizzle',
    staticIconPath: 'icons/static/moderate-rain.svg',
});
// rainy
addIconMapping([61], {
    path: 'icons/slight-rain.svg',
    name: 'slight rain',
    staticIconPath: 'icons/static/slight-rain.svg',
});
addIconMapping([63], {
    path: 'icons/moderate-rain.svg',
    name: 'moderate rain',
    staticIconPath: 'icons/static/moderate-rain.svg',
});
addIconMapping([65], {
    path: 'icons/heavy-rain.svg',
    name: 'heavy rain',
    staticIconPath: 'icons/static/heavy-rain.svg',
});
// freezing rain
addIconMapping([66], {
    path: 'icons/slight-rain.svg',
    name: 'slight freezed rain',
    staticIconPath: 'icons/static/slight-rain.svg',
});
addIconMapping([67], {
    path: 'icons/heavy-rain.svg',
    name: 'heavy freezed rain',
    staticIconPath: 'icons/static/heavy-rain.svg',
});
// snow
addIconMapping([71], {
    path: 'icons/slight-snow.svg',
    name: 'silght snow',
    staticIconPath: 'icons/static/slight-snow.svg',
});
addIconMapping([73], {
    path: 'icons/moderate-snow.svg',
    name: 'moderate snow',
    staticIconPath: 'icons/static/moderate-snow.svg',
});
addIconMapping([75, 77], {
    path: 'icons/heavy-snow.svg',
    name: 'heavy snow',
    staticIconPath: 'icons/static/heavy-snow.svg',
});
// rain showers
addIconMapping([80], {
    path: 'icons/slight-rain-showers.svg',
    name: 'slight rain showers',
    staticIconPath: 'icons/static/slight-rain-showers.svg',
});
addIconMapping([81], {
    path: 'icons/moderate-rain-showers.svg',
    name: 'moderate rain showers',
    staticIconPath: 'icons/static/moderate-rain-showers.svg',
});
addIconMapping([82], {
    path: 'icons/heavy-rain-showers.svg',
    name: 'heavy rain showers',
    staticIconPath: 'icons/static/heavy-rain-showers.svg',
});
// snow showers
addIconMapping([85], {
    path: 'icons/slight-snow-showers.svg',
    name: 'slight snow showers',
    staticIconPath: 'icons/static/slight-snow-showers.svg',
});
addIconMapping([86], {
    path: 'icons/heavy-snow-showers.svg',
    name: 'heavy snow showers',
    staticIconPath: 'icons/static/heavy-snow-showers.svg',
});
// thunderstorm
addIconMapping([95, 96, 99], {
    path: 'icons/thunderstorm.svg',
    name: 'thunderstorm',
    staticIconPath: 'icons/static/thunderstorm.svg',
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
