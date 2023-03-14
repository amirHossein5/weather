import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import dayjsTz from 'dayjs/plugin/timezone';
import dayjsUtc from 'dayjs/plugin/utc';

dayjs.extend(isSameOrAfter);
dayjs.extend(dayjsUtc);
dayjs.extend(dayjsTz);
dayjs.tz.setDefault(localStorage.timezone);

export default dayjs;
