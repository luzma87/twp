import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  AppBar, Hidden, IconButton, Toolbar, Tooltip,
} from '@material-ui/core';
import { withTheme } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import roles from '../../constants/roles';
import routes from '../../constants/routes';
import shapes from '../../constants/shapes';
import AuthUserContext from '../session/context';
import SignOutButton from '../signOut/SignOutButton';
import AdminMenu from './AdminMenu';
import NavBarHybridButton from './NavBarHybridButton';
import NavBarIconButton from './NavBarIconButton';
import NavBarTextLink from './NavBarTextLink';

const myPaymentsButton = (isAdmin, theme) => (isAdmin
  ? (
    <NavBarIconButton
      id="my-payments"
      title="Mis pagos"
      icon="hand-holding-usd"
      to={routes.USER_PAYMENT}
      color={theme.palette.secondary.dark}
    />
  )
  : <NavBarHybridButton title="Mis pagos" icon="hand-holding-usd" to={routes.USER_PAYMENT} color="secondary" />);

const NavigationAuth = ({ authUser, theme }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { roles: userRoles } = authUser;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const adminNav = userRoles[roles.ADMIN] ? (
    <>
      <Hidden smDown>
        <NavBarIconButton id="people" title="Personas" icon="user-astronaut" to={routes.USERS} />
        <NavBarIconButton id="places" title="Puestos" icon="warehouse" to={routes.BUILDINGS} />
      </Hidden>
      <NavBarIconButton id="assignments" title="Asignaciones" icon="rocket" to={routes.ASSIGNMENTS} />
      <Hidden smDown>
        <NavBarIconButton id="email" title="Email" icon="envelope-open-dollar" to={routes.ASSIGNMENT_EMAIL} />
      </Hidden>
      <NavBarIconButton id="owner-payments" title="Pagos" icon="money-check-edit-alt" to={routes.PAYMENTS} />
      <NavBarIconButton id="user-payments" title="Pagos Usuarios" icon="sack-dollar" to={routes.ALL_USERS_PAYMENTS} />
      <Hidden smDown>
        <NavBarIconButton id="params" title="Params" icon="alicorn" to={routes.PARAMS} />
      </Hidden>
    </>
  ) : null;

  const adminMenu = userRoles[roles.ADMIN] ? (
    <Hidden mdUp>
      <Tooltip title="Admin menu">
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="secondary"
        >
          <FontAwesomeIcon icon={['far', 'alicorn']} />
        </IconButton>
      </Tooltip>
      <AdminMenu anchorEl={anchorEl} handleClose={handleClose} open={open} />
    </Hidden>
  ) : null;

  return (
    <AppBar position="static" className="root" data-cy="navbar">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <div className="navbar-part">
          <NavBarTextLink to={routes.HOME} text="TWP" title="Inicio" />
          {myPaymentsButton(userRoles[roles.ADMIN], theme)}
          {adminNav}
        </div>

        <div className="navbar-part">
          {adminMenu}
          <NavBarIconButton id="my-account" title="Mi cuenta" icon="user" to={routes.ACCOUNT} />
          <SignOutButton />
        </div>
      </Toolbar>
    </AppBar>
  );
};

NavigationAuth.propTypes = {
  authUser: PropTypes.shape(shapes.user).isRequired,
  theme: PropTypes.any.isRequired,
};

const Navigation = ({ theme }) => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) => (authUser
        ? <NavigationAuth authUser={authUser} theme={theme} />
        : null)}
    </AuthUserContext.Consumer>
  </div>
);

Navigation.propTypes = {
  theme: PropTypes.any.isRequired,
};

export default withTheme(Navigation);
