const HOURS_PER_DAY = 24;
const MINUTES_PER_HOUR = 60;
const MILLISECONDS_PER_MINUTE = 60000;

/**
 * Get the date in the format YYYY-MM-DDTHH:MM:SS
 * Defaults to current date
 *
 * @param {string} [date] date in ISOString
 */
export const getDate = (date = new Date().toISOString()) => date.split('.')[0];

/**
 * Get the current date in the format YYYY-MM-DDTHH:MM:SS days in the future
 *
 * @param {string} days how many days in the future
 */
export const getDateInFutureDays = days =>
  getDate(
    new Date(
      new Date().getTime() +
        days * HOURS_PER_DAY * MINUTES_PER_HOUR * MILLISECONDS_PER_MINUTE
    ).toISOString()
  );
