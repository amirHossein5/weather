/**
 * @param {HtmlNode} el
 * @param {[][String attribute, value]} attributes
 */
export function setAttributes(el, attributes) {
    attributes.forEach(([attr, value]) => el.setAttribute(attr, value));
}

/**
 * Sets weather data in local storage
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
    const notBlankValueKeys = ['lat', 'long', 'timezone', 'city', 'province'];
    const requiredKeysButMayBlankValue = [];

    for (let index in requiredKeysButMayBlankValue) {
        let key = requiredKeysButMayBlankValue[index];

        if (!(key in localStorage)) {
            return false;
        }
    }

    for (let index in notBlankValueKeys) {
        let key = notBlankValueKeys[index];

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

/**
 * @param {String} dataName
 * @param {closure} closure
 * @param {closure} selector
 */
export function setElementsData(dataName, closure, selector = document) {
    selector.querySelectorAll(`[data-${dataName}]`).forEach((el) => {
        closure(el);
    });
}

/**
 * Returns appropriate value based on current media query breakpoints.
 * @param  {Object} breakPointData - key is max-height media query,
 * value is expected return value on that media query.
 * @param  {Number} defaultValue
 * @return {Number}
 */
export function bestMatchQuery(breakPointData, defaultValue) {
    if (Object.keys(breakPointData).length === 0) {
        return defaultValue;
    }

    let sortedBreakPoints = sortObjectByKeys(breakPointData);
    let sortedBreakPointsArr = Object.entries(sortedBreakPoints);

    for (let index in sortedBreakPointsArr) {
        let [breakPoint, value] = sortedBreakPointsArr[index];
        if (window.matchMedia(`(max-height: ${breakPoint}px)`).matches) {
            return value;
        }
    }

    return defaultValue;
}

/**
 * @param  {Object} unordered
 * @return {Object}
 */
export function sortObjectByKeys(unordered) {
    return Object.keys(unordered)
        .sort()
        .reduce((obj, key) => {
            obj[key] = unordered[key];
            return obj;
        }, {});
}

export function minObjectValueOfKey(objectKey, object) {
    return object.reduce(function (prev, curr) {
        return prev[objectKey] < curr[objectKey] ? prev : curr;
    })[objectKey];
}

export function maxObjectValueOfKey(objectKey, object) {
    return object.reduce(function (prev, curr) {
        return prev[objectKey] > curr[objectKey] ? prev : curr;
    })[objectKey];
}

export function cloneObject(object) {
    return JSON.parse(JSON.stringify(object));
}
