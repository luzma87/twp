import constants from './constants';

const getDisplayMonthForSelect = (monthIndex) => constants.monthNames[monthIndex];

const getMonthFromDate = (date) => {
  const monthIndex = date.getMonth();
  return constants.monthNames[monthIndex];
};

const getDisplayMonthWithYear = (date) => {
  if (date === undefined) return '';
  const monthIndex = date.month;
  return `${constants.monthNames[monthIndex]} ${date.year}`;
};

const getDisplayMonthFromSelect = (selectedMonth) => {
  const [month, year] = selectedMonth.split('_');
  return `${getDisplayMonthForSelect(parseInt(month, 10))} ${year}`;
};

const getMonthsForSelect = (date) => {
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const months = {};
  for (let i = 0; i < 4; i += 1) {
    let month = currentMonth - i;
    let year = currentYear;
    if (month < 0) {
      month = 12 + month;
      year = currentYear - 1;
    }
    const key = `${i}_${month}_${year}`;
    months[key] = {
      label: `${getDisplayMonthForSelect(month)} ${year}`,
      value: `${month}_${year}`,
    };
  }
  return months;
};

const getCurrentMonthForSelect = () => {
  const date = new Date();
  return `${date.getMonth()}_${date.getFullYear()}`;
};

const monthsHelper = {
  getMonthsForSelect,
  getDisplayMonthForSelect,
  getMonthFromDate,
  getDisplayMonthWithYear,
  getDisplayMonthFromSelect,
  getCurrentMonthForSelect,
};

export default monthsHelper;
