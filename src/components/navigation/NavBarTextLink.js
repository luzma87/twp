import { Tooltip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const NavBarTextLink = ({ title, text, to }) => (
  <Tooltip title={title}>
    <Typography variant="h6" color="inherit" style={{ marginRight: 8 }}>
      <Link to={to} style={{ color: 'white', textDecoration: 'none' }}>
        {text}
      </Link>
    </Typography>
  </Tooltip>
);

NavBarTextLink.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

NavBarTextLink.defaultProps = {};

export default NavBarTextLink;
