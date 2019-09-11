import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import React from 'react';
import roles from '../../constants/roles';
import routes from '../../constants/routes';
import shapes from '../../constants/shapes';
import AuthUserContext from '../Session/context';
import SignOutButton from '../SignOut/SignOutButton';
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
  const { username, email, roles: userRoles } = authUser;

  const adminNav = userRoles[roles.ADMIN] ? (
    <NavBarIconLink title="Admin" icon="alicorn" to={routes.ADMIN} />
  ) : null;

  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <div className="navbar-part">
          <NavBarTextLink to={routes.HOME} text="TWP" title="Inicio" />
          {/* <NavBarIcon title="Personas" icon="user-astronaut" to={routes.personList()} /> */}
          {/* <NavBarIcon title="Puestos" icon="warehouse" to={routes.buildingList()} /> */}
          {/* <NavBarIcon title="Asignaciones" icon="rocket" to={routes.assignments()} /> */}
          {adminNav}
        </div>

        <div className="navbar-part">
          <NavBarTextLink to={routes.ACCOUNT} text={username || email} title="Mi cuenta" />
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
