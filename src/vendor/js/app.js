import Alpine from 'alpinejs';

import alerts from '@vendor/js/alerts/alerts';
import getCities from '@vendor/js/api/cities-api';
import { empty, hasRequiredData, isNotEmpty, localStorageClearExcept, setLocalStorageData } from '@vendor/js/helpers';
import { fillDayHoursData, removeDayHoursData, showWeather } from '@vendor/js/show-weather';
import { applyTheme, changeThemeToDark, changeThemeToLight } from '@vendor/js/theme';

window.alerts = alerts;
window.setLocalStorageData = setLocalStorageData;
window.changeThemeToDark = changeThemeToDark;
window.changeThemeToLight = changeThemeToLight;
window.localStorageClearExcept = localStorageClearExcept;
window.fillDayHoursData = fillDayHoursData;
window.removeDayHoursData = removeDayHoursData;
window.empty = empty;
window.isNotEmpty = isNotEmpty;

Alpine.start();
applyTheme();

if (hasRequiredData()) {
    showWeather();
} else {
    window.getCities = getCities;
    showCityForm();
}

function showCityForm() {
    let locationForm = document.querySelector('#locationForm');

    locationForm.classList.remove('hidden');
    locationForm.querySelector('#cityInput').focus();
}
