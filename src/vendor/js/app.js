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
} else {
    window.getCities = getCities;
    showCityForm();
}

function showCityForm() {
    let locationForm = document.querySelector('#locationForm');

    locationForm.closest('.hidden').classList.remove('hidden');
    locationForm.querySelector('#cityInput').focus();
}
