import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import customLink from './customLink';

const NavBarIconButton = ({
  title, icon, to, color, id,
}) => (
  <Tooltip title={title}>
    <IconButton component={customLink(to)} data-cy={`${id}-nav-button`}>
      <FontAwesomeIcon icon={['far', icon]} style={{ color }} />
    </IconButton>
  </Tooltip>
);

NavBarIconButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  color: PropTypes.string,
};

NavBarIconButton.defaultProps = {
  color: 'white',
};

export default NavBarIconButton;
