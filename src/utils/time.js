import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjs.extend(relativeTime);
dayjs.extend(utc);

/**
 * Get the date format for date input fields
 *
 */
export const getDateFormat = () => {
  const userAccount = JSON.parse(localStorage.getItem('account') || '{}');
  const dateFormat = userAccount?.user?.date_format || 'american';

  return dateFormat === 'british'
    ? ['dd/MM/yyyy', 'DD/MM/YYYY']
    : ['MM/dd/yyyy', 'MM/DD/YYYY'];
};

/**
 * Get the date based on the logged in user's date format (American or british)
 * @param {*} datetime
 * @param {*} verbose - Determines if it should display date in the format -> 23 Jan 2024
 * @param {*} hyphen - If the dates should use hyphens instead of slashes
 * @returns
 */
export const getDate = (datetime, verbose = false, hyphen = true) => {
  if (!datetime) {
    return ' ';
  }

  datetime = dayjs(new Date(datetime)).format('D MMMM YYYY');

  // Get the users date format
  const userAccount = JSON.parse(localStorage.getItem('account') || '{}');
  const dateFormat = userAccount?.user?.date_format || 'american';

  const date = dayjs(datetime).utc();

  if (verbose) {
    const dateText = datetime.split(' ');

    if (dateFormat === 'british') {
      return datetime;
    }
    return `${dateText[1]} ${dateText[0]}, ${dateText[2]}`;
  } else {
    if (dateFormat === 'british') {
      return hyphen ? date.format('DD-MM-YY') : date.format('DD/MM/YY');
    }
    return hyphen ? date.format('MM-DD-YY') : date.format('MM/DD/YY');
  }
};
