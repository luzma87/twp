import {
  FormControl, InputLabel, MenuItem, Select,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const CustomSelect = (props) => {
  const {
    id, value, label, values, onChange,
  } = props;
  return (
    <FormControl style={{ marginTop: 16 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={(event) => onChange(event)}
        inputProps={{
          name: id,
          id,
        }}
      >
        {Object.keys(values).map((val) => {
          const item = values[val];
          const itemValue = item.value;
          const itemLabel = item.label;
          return <MenuItem key={val} value={itemValue}>{itemLabel}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};

CustomSelect.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  values: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
};

CustomSelect.defaultProps = {};

export default CustomSelect;
