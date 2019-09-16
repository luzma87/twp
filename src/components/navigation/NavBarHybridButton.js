import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import React from 'react';
import customLink from './customLink';

const NavBarHybridButton = ({ title, icon, to }) => (
  <Tooltip title={title}>
      <Button color="inherit" component={customLink(to)}>
        <FontAwesomeIcon icon={['far', icon]} style={{ marginRight: 8 }} />
        {title}
      </Button>
  </Tooltip>
);

NavBarHybridButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};


export default NavBarHybridButton;
