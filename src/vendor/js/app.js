import Alpine from 'alpinejs';

import { hasRequiredData, setLocalStorageData } from '@vendor/js/helpers';
import getCities from '@vendor/js/api/cities-api';
import alerts from '@vendor/js/alerts/alerts';
import showWeather from '@vendor/js/show-weather';
import * as weatherIcon from '@vendor/js/weather-icon'
Alpine.start();
window.alerts = alerts;
window.setLocalStorageData = setLocalStorageData;

if (hasRequiredData()) {
    showWeather();
    // Array.from(weatherIcon.icons()).forEach(([i, icon]) => {
    //     let img = document.createElement('img')
    //     img.classList.add('w-10')
    //     img.setAttribute('src', icon.staticIconPath)
    //     document.body.append(img)
    //     let img2 = document.createElement('img')
    //     img2.classList.add('w-20')
    //     img2.setAttribute('src', icon.path)
    //     document.body.append(img2)
    // })
} else {
    window.getCities = getCities;
    showCityForm();
}

function showCityForm() {
    let locationForm = document.querySelector('#locationForm');

    locationForm.closest('.hidden').classList.remove('hidden');
    locationForm.querySelector('#cityInput').focus();
}
