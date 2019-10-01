/* eslint-disable react/jsx-props-no-spreading */
import { withTheme } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import CustomIcon from './CustomIcon';

const ActiveIndicator = ({
  icon, isActive, theme, themed, ...rest
}) => {
  const color = isActive ? theme.palette.active[500] : theme.palette.inactive[500];
  return <CustomIcon icon={icon} themed={themed} style={{ marginRight: 8, color }} {...rest} />;
};

ActiveIndicator.propTypes = {
  icon: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  themed: PropTypes.bool,
  theme: PropTypes.any.isRequired,
};

ActiveIndicator.defaultProps = {
  isActive: false,
  themed: false,
};

export default withTheme(ActiveIndicator);
