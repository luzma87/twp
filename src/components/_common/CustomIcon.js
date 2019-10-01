/* eslint-disable react/jsx-props-no-spreading */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/styles';

const CustomIcon = ({
  icon, theme, themed, ...rest
}) => {
  const getIcon = () => (themed ? ['far', theme.icons[icon]] : ['far', icon]);
  return (
    <FontAwesomeIcon icon={getIcon(icon)} {...rest} />
  );
};

CustomIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  theme: PropTypes.any.isRequired,
  themed: PropTypes.bool,
};

CustomIcon.defaultProps = {
  themed: false,
};

export default withTheme(CustomIcon);
