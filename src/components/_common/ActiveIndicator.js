/* eslint-disable react/jsx-props-no-spreading */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/styles';

const ActiveIndicator = ({
  icon, isActive, theme, ...rest
}) => {
  const color = isActive ? theme.palette.active[500] : theme.palette.inactive[500];
  return <FontAwesomeIcon icon={['far', icon]} style={{ marginRight: 8, color }} {...rest} />;
};

ActiveIndicator.propTypes = {
  icon: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  theme: PropTypes.any.isRequired,
};

ActiveIndicator.defaultProps = {
  isActive: false,
};

export default withTheme(ActiveIndicator);
