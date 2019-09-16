import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import React from 'react';
import roles from '../../constants/roles';
import routes from '../../constants/routes';
import shapes from '../../constants/shapes';
import AuthUserContext from '../session/context';
import SignOutButton from '../signOut/SignOutButton';
import NavBarHybridButton from './NavBarHybridButton';
import NavBarIconButton from './NavBarIconButton';
import NavBarTextButton from "./NavBarTextButton";
import NavBarTextLink from './NavBarTextLink';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) => (authUser
        ? <NavigationAuth authUser={authUser} />
        : null)}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = ({ authUser }) => {
  const { name, email, roles: userRoles } = authUser;

  const adminNav = userRoles[roles.ADMIN] ? (
    <>
      <NavBarIconButton title="Personas" icon="user-astronaut" to={routes.USERS} />
      <NavBarIconButton title="Puestos" icon="warehouse" to={routes.BUILDINGS} />
      <NavBarIconButton title="Asignaciones" icon="rocket" to={routes.ASSIGNMENTS} />
      <NavBarIconButton title="Email" icon="envelope-open-dollar" to={routes.EMAIL} />
      <NavBarIconButton title="Pagos" icon="money-check-edit-alt" to={routes.PAYMENTS} />
      <NavBarIconButton title="Params" icon="alicorn" to={routes.PARAMS} />
    </>
  ) : null;

  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <div className="navbar-part">
          <NavBarTextLink to={routes.HOME} text="TWP" title="Inicio" />
          <NavBarHybridButton title="Asignaciones" icon="rocket" to={routes.HOME} />
          {adminNav}
        </div>

        <div className="navbar-part">
          <NavBarTextButton to={routes.ACCOUNT} text={name || email} title="Mi cuenta" />
          <SignOutButton />
        </div>
      </Toolbar>
    </AppBar>
  );
};

NavigationAuth.propTypes = {
  authUser: PropTypes.shape(shapes.user).isRequired,
};

export default Navigation;
