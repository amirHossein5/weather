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
 * @param {String} city
 * @param {String} province
 */
export function setLocalStorageData({ lat, long, fullLat, fullLong, city, province }) {
    localStorage.setItem('lat', lat);
    localStorage.setItem('long', long);
    localStorage.setItem('fullLat', fullLat);
    localStorage.setItem('fullLong', fullLong);
    localStorage.setItem('city', city);
    localStorage.setItem('province', province);
}

/**
 * Determines all of required data are filled in local storage
 * @return {Boolean}
 */
export function hasRequiredData() {
    const notBlankValueKeys = ['lat', 'long', 'fullLat', 'fullLong', 'city', 'province'];
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

/**
 * @param  {string} key
 */
export function localStorageClearExcept(key) {
    let keyValue = localStorage.getItem(key);
    localStorage.clear();
    if (!empty(keyValue)) localStorage.setItem(key, keyValue);
}

export function empty(value) {
    if (value === undefined) return true;
    if (value === 'undefined') return true;
    if (value === null) return true;

    if (typeof value === 'string' && value.trim() === '') return true;
    if (typeof value === 'boolean' && value === false) return true;
    if (typeof value === 'object' && 'length' in value && value.length === 0) return true;

    return false;
}

export function isNotEmpty(value) {
    return !empty(value);
}

export function appendInAppropriateOrderAmongChilds(appendTo, newElement, currentValue, childsAttrName) {
    if (currentValue === undefined) {
        appendTo.append(newElement);
        return;
    }

    if (appendTo.children.length === 0) {
        appendTo.append(newElement);
        return;
    }

    if (appendTo.querySelectorAll(`[${childsAttrName}]`).length === 0) {
        appendTo.append(newElement);
        return;
    }

    let children = Array.from(appendTo.children);
    let insertBefore;

    for (let index in children) {
        let child = children[index];
        let childValue = child.getAttribute(childsAttrName);

        if (empty(childValue)) {
            continue;
        }
        if (currentValue < childValue) {
            insertBefore = child;
            break;
        }
    }

    if (empty(insertBefore)) {
        appendTo.append(newElement);
        return;
    }

    appendTo.insertBefore(newElement, insertBefore);
}
