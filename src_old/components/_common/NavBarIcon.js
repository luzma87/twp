import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavBarIcon = ({ title, icon, to }) => (
  <Tooltip title={title}>
    <Link to={to} style={{ color: 'white' }}>
      <IconButton aria-label={title} color="inherit">
        <FontAwesomeIcon icon={['far', icon]} />
      </IconButton>
    </Link>
  </Tooltip>
);

NavBarIcon.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

NavBarIcon.defaultProps = {};

export default NavBarIcon;
