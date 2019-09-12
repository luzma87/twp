import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import React from 'react';
import roles from '../../constants/roles';
import routes from '../../constants/routes';
import shapes from '../../constants/shapes';
import AuthUserContext from '../session/context';
import SignOutButton from '../signOut/SignOutButton';
import NavBarIconLink from './NavBarIconLink';
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
      <NavBarIconLink title="Personas" icon="user-astronaut" to={routes.USERS} />
      <NavBarIconLink title="Puestos" icon="warehouse" to={routes.BUILDINGS} />
      <NavBarIconLink title="Asignaciones" icon="rocket" to={routes.ASSIGNMENTS} />
    </>
  ) : null;

  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <div className="navbar-part">
          <NavBarTextLink to={routes.HOME} text="TWP" title="Inicio" />
          {adminNav}
        </div>

        <div className="navbar-part">
          <NavBarTextLink to={routes.ACCOUNT} text={name || email} title="Mi cuenta" />
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
