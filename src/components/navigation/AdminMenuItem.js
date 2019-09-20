/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const AdminMenuItem = forwardRef(({
  handleClose, icon, text, to,
}, ref) => (
  <MenuItem onClick={handleClose}>
    <Link to={to} className="link">
      <FontAwesomeIcon icon={['far', icon]} style={{ marginRight: 8 }} />
      {text}
    </Link>
  </MenuItem>
));

AdminMenuItem.propTypes = {
  handleClose: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default AdminMenuItem;
