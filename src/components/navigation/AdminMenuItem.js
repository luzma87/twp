/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import CustomIcon from '../_common/CustomIcon';

const AdminMenuItem = forwardRef(({
  handleClose, icon, text, to, themed,
}, ref) => (
  <MenuItem onClick={handleClose}>
    <Link to={to} className="link">
      <CustomIcon icon={icon} style={{ marginRight: 8 }} themed={themed} />
      {text}
    </Link>
  </MenuItem>
));

AdminMenuItem.propTypes = {
  handleClose: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  themed: PropTypes.bool,
};

AdminMenuItem.defaultProps = {
  themed: false,
};

export default AdminMenuItem;
