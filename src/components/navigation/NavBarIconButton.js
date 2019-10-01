import { IconButton, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import CustomIcon from '../_common/CustomIcon';
import customLink from './customLink';

const NavBarIconButton = ({
  title, icon, to, color, id, themed,
}) => (
  <Tooltip title={title}>
    <IconButton component={customLink(to)} data-cy={`${id}-nav-button`}>
      <CustomIcon icon={icon} style={{ color }} themed={themed} />
    </IconButton>
  </Tooltip>
);

NavBarIconButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  color: PropTypes.string,
  themed: PropTypes.bool,
};

NavBarIconButton.defaultProps = {
  color: 'white',
  themed: false,
};

export default NavBarIconButton;
