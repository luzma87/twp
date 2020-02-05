import { Menu } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import routes from '../../constants/routes';
import AdminMenuItem from './AdminMenuItem';

const AdminMenu = ({ anchorEl, open, handleClose }) => (
  <Menu
    id="menu-appbar"
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={open}
    onClose={handleClose}
  >
    <AdminMenuItem text="Personas" icon="user" themed to={routes.USERS} handleClose={handleClose} />
    <AdminMenuItem text="Bicis y Motos" icon="bike" themed to={routes.BIKES} handleClose={handleClose} />
    <AdminMenuItem text="Puestos" icon="building" themed to={routes.BUILDINGS} handleClose={handleClose} />
    <AdminMenuItem text="Email" icon="envelope-open-dollar" to={routes.ASSIGNMENT_EMAIL} handleClose={handleClose} />
    <AdminMenuItem text="Params" icon="admin" themed to={routes.PARAMS} handleClose={handleClose} />
  </Menu>
);

AdminMenu.propTypes = {
  anchorEl: PropTypes.any,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

AdminMenu.defaultProps = {
  anchorEl: null,
};

export default AdminMenu;
