import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import dayjsTz from 'dayjs/plugin/timezone';
import dayjsUtc from 'dayjs/plugin/utc';

dayjs.extend(isSameOrAfter);

export function getInstace() {
    return dayjs;
}

export function tz(timezone) {
    dayjs.extend(dayjsUtc);
    dayjs.extend(dayjsTz);
    dayjs.tz.setDefault(timezone);
    return dayjs.tz;
}
