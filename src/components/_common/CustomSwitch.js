import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import React from 'react';
import PropTypes from 'prop-types';

const CustomSwitch = (props) => {
  const {
    checked, handleSwitchChange, id, label,
  } = props;
  return (
    <FormControlLabel
      value="top"
      control={(
        <Switch
          checked={checked}
          onChange={() => {
            const event = {
              target: {
                name: id,
                value: !checked,
              },
            };
            handleSwitchChange(event);
          }}
          value={id}
          color="primary"
        />
      )}
      label={label}
      labelPlacement="top"
    />
  );
};

CustomSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  handleSwitchChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

CustomSwitch.defaultProps = {};

export default CustomSwitch;
