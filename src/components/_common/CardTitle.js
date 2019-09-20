import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const CardTitle = ({ label, icon, iconColor }) => (
  <Typography variant="h5" gutterBottom>
    <FontAwesomeIcon icon={['far', icon]} style={{ marginRight: 16 }} color={iconColor} />
    {label}
  </Typography>
);

CardTitle.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
};

CardTitle.defaultProps = {
  iconColor: 'black',
};

export default CardTitle;
