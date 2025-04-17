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

const DAYS_LANG_MAP = {
  monday: { pt: 'Segunda', en: 'Monday' },
  tuesday: { pt: 'Terça', en: 'Tuesday' },
  wednesday: { pt: 'Quarta', en: 'Wednesday' },
  thursday: { pt: 'Quinta', en: 'Thursday' },
  friday: { pt: 'Sexta', en: 'Friday' },
  saturday: { pt: 'Sábado', en: 'Saturday' },
  sunday: { pt: 'Domingo', en: 'Sunday' }
};

/**
 * Format the hours from '1500' to '15:00'
 *
 * @param {string} hours hours
 */
const formatCalendarHours = hours => `${hours.slice(0, 2)}:${hours.slice(2)}`;

/**
 * Whether a group of days are in sequence.
 * e.g.
 * ['Monday', 'Tuesday'] -> true
 * ['Monday', 'Tuesday', 'Friday'] -> false
 *
 * @param {string[]} days the group of days
 * @param {string} language the selected language
 */
const areDaysSequential = (days, language) => {
  const dayOrder = Object.values(DAYS_LANG_MAP).map(day => day[language]);
  const indexes = days.map(day => dayOrder.indexOf(day));

  for (let i = 1; i < indexes.length; i++) {
    if (indexes[i] !== indexes[i - 1] + 1) {
      return false;
    }
  }

  return true;
};

/**
 * Format an object calendar into a group of schedule strings
 *
 * @param {object} calendar the calendar
 * @param {string} language the selected language
 */
export const formatCalendar = (calendar, language) => {
  const group = Object.entries(DAYS_LANG_MAP).reduce((acc, [day, label]) => {
    if (calendar[day].length === 0) {
      return acc;
    }

    const openingHours = calendar[day]
      .map(
        schedule =>
          `${formatCalendarHours(schedule.start)}–${formatCalendarHours(
            schedule.finish
          )}`
      )
      .join(', ');
    return {
      ...acc,
      [openingHours]: [...(acc[openingHours] ?? []), label[language]]
    };
  }, {});

  const parsed = Object.entries(group).map(([openingHours, labels]) => {
    if (labels.length === 1) {
      return `${labels[0]} ${openingHours}`;
    }

    if (areDaysSequential(labels, language)) {
      return `${labels[0]} - ${labels[labels.length - 1]} ${openingHours}`;
    }

    return `${labels.join(', ')} ${openingHours}`;
  });

  return parsed.length > 0 ? parsed : null;
};
