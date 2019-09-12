import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import routes from '../../constants/routes';
import AccountPage from '../account/AccountPage';
import BuildingFormPage from '../buildings/BuildingFormPage';
import BuildingsPage from '../buildings/BuildingsPage';
import HomePage from '../home/HomePage';
import Navigation from '../navigation/Navigation';
import PasswordForgetPage from '../passwordForget/PasswordForgetPage';
import withAuthentication from '../session/withAuthentication';
import SignInPage from '../signIn/SignInPage';
import SignUpPage from '../signUp/SignUpPage';
import UserFormPage from '../users/UserFormPage';
import UsersPage from '../users/UsersPage';

const App = () => (
  <BrowserRouter>
    <div>
      <Navigation />
      <Route exact path={routes.HOME} component={HomePage} />
      <Route path={routes.SIGN_UP} component={SignUpPage} />
      <Route path={routes.SIGN_IN} component={SignInPage} />
      <Route path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={routes.ACCOUNT} component={AccountPage} />

      <Route exact path={routes.USERS} component={UsersPage} />
      <Route path={routes.USERS_CREATE} component={UserFormPage} />
      <Route exact path={routes.BUILDINGS} component={BuildingsPage} />
      <Route path={routes.BUILDINGS_CREATE} component={BuildingFormPage} />
    </div>
  </BrowserRouter>
);

export default withAuthentication(App);
