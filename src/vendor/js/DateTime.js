export default class DateTime {
    constructor({language = 'en-US', timezone = 'UTC'}) {
        this.language = language;
        this.timezone = timezone;
    }

    /**
     * Returns current timestamp based on current timezone.
     * @return {Date}
     */
    getCurrentTimeStamp() {
        return this.getCurrentDate().getTime();
    }

    /**
     * Returns current date based on current timezone.
     * @return {Date}
     */
    getCurrentDate() {
        return this.getDate();
    }

    /**
     * Returns date based on timestamp.
     * @param  {Number} timestamp in seconds
     * @return {Date}
     */
    fromSecondsTimestamp(secondTimestamp) {
        return this.getDate(secondTimestamp * 1000);
    }

    /**
     * Returns date based on timestamp.
     * @param  {Number} timestamp in milliseconds
     * @return {Date}
     */
    fromTimestamp(timestamp) {
        return this.getDate(timestamp);
    }

    /**
     * Returns current date if not timestamp provided.
     * @return {Number} timestamp in milliseconds
     */
    getDate(timestamp = undefined) {
        console.log(new Date().toLocaleString(this.language, {timeZone: this.timezone}))
        if (!timestamp) {
            return new Date(new Date().toLocaleString(this.language, {timeZone: this.timezone}));
        }
        return new Date(new Date(timestamp).toLocaleString(this.language, {timeZone: this.timezone}));
    }
}
