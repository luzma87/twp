import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const CardTitle = ({ label, icon }) => (
  <Typography variant="h5">
    <FontAwesomeIcon icon={['far', icon]} style={{ marginRight: 16 }} />
    {label}
  </Typography>
);

CardTitle.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

CardTitle.defaultProps = {};

export default CardTitle;
