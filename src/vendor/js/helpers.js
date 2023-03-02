import axios from 'axios'

/**
 * Sets multiple attributes of element.
 * @param {HtmlNode} el
 * @param {[][String attribute, value]} attributes
 */
export function setAttributes(el, attributes) {
    attributes.forEach(([attr, value]) => el.setAttribute(attr, value));
}

/**
 * Setting weather data in local storage
 * @param {String} lat
 * @param {String} long
 * @param {String} timezone
 * @param {String} city
 * @param {String} province
 */
export function setLocalStorageData({ lat, long, timezone, city, province }) {
    localStorage.setItem('lat', lat);
    localStorage.setItem('long', long);
    localStorage.setItem('timezone', timezone);
    localStorage.setItem('city', city);
    localStorage.setItem('province', province);
}

/**
 * Determines all of required data are filled in local storage
 * @return {Boolean}
 */
export function hasRequiredData() {
    const notBlankKeys = ['lat', 'long', 'timezone', 'city'];
    const requiredKeys = ['province'];

    for (let index in requiredKeys) {
        let key = requiredKeys[index];

        if (!(key in localStorage)) {
            return false;
        }
    }

    for (let index in notBlankKeys) {
        let key = notBlankKeys[index];

        // prettier-ignore
        if ( !(key in localStorage)
            || localStorage.getItem(key) == undefined
            || localStorage.getItem(key) == ''
        ) {
            return false;
        }
    }

    return true;
}
