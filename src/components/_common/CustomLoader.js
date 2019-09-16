import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const CustomLoader = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }
  return (
    <Typography color="secondary">
      <FontAwesomeIcon
        icon={['far', 'spinner']}
        pulse
        size="4x"
      />
    </Typography>
  );
};

CustomLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default CustomLoader;
