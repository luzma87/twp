import PropTypes from 'prop-types';
import React from 'react';
import monthsHelper from '../../constants/monthsHelper';
import CustomSelect from './CustomSelect';

const MonthsSelect = ({ value, date, onChange }) => (
  <CustomSelect
    id="month"
    value={value}
    label="Selecciona el mes aquí"
    values={monthsHelper.getMonthsForSelect(date)}
    onChange={(event) => onChange(event)}
  />
);

MonthsSelect.propTypes = {
  value: PropTypes.any,
  date: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

MonthsSelect.defaultProps = {
  value: null,
  date: '',
};

export default MonthsSelect;
