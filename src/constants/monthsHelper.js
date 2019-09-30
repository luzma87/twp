import constants from './constants';

const getDisplayMonthForSelect = (monthIndex) => constants.monthNames[monthIndex];

const getMonthFromDate = (date) => {
  const monthIndex = date.getMonth();
  return constants.monthNames[monthIndex];
};

const getNextMonthFromDate = (date) => {
  const monthIndex = date.getMonth();
  if (monthIndex === 11) {
    return 0;
  }
  return constants.monthNames[monthIndex + 1];
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
  for (let i = -1; i < 3; i += 1) {
    let month = currentMonth - i;
    let year = currentYear;
    if (month < 0) {
      month = 12 + month;
      year = currentYear - 1;
    } else if (month === 12) {
      month = 0;
      year = currentYear + 1;
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
  getNextMonthFromDate,
  getDisplayMonthWithYear,
  getDisplayMonthFromSelect,
  getCurrentMonthForSelect,
};

export default monthsHelper;
