import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import React from 'react';
import customLink from './customLink';

const NavBarIconButton = ({ title, icon, to }) => (
  <Tooltip title={title}>
    <IconButton component={customLink(to)}>
      <FontAwesomeIcon icon={['far', icon]} style={{ color: 'white' }} />
    </IconButton>
  </Tooltip>
);

NavBarIconButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

NavBarIconButton.defaultProps = {};

export default NavBarIconButton;
