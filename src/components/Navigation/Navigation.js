import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import roles from '../../constants/roles';
import shapes from '../../constants/shapes';
import AuthUserContext from '../Session/context';
import SignOutButton from '../SignOut/SignOutButton';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) => (authUser
        ? <NavigationAuth authUser={authUser} />
        : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = ({ authUser }) => (
  <ul>
    <li>
      <Link to={routes.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={routes.HOME}>Home</Link>
    </li>
    <li>
      <Link to={routes.ACCOUNT}>Account</Link>
    </li>
    {!!authUser.roles[roles.ADMIN] && (
      <li>
        <Link to={routes.ADMIN}>Admin</Link>
      </li>
    )}
    <li>
      <SignOutButton />
    </li>
  </ul>
);

NavigationAuth.propTypes = {
  authUser: PropTypes.shape(shapes.user).isRequired,
};

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={routes.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={routes.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
