import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import routes from '../../constants/routes';
import AccountPage from '../account/AccountPage';
import AssignmentFormPage from '../assignments/AssignmentFormPage';
import AssignmentsPage from '../assignments/AssignmentsPage';
import BuildingFormPage from '../buildings/BuildingFormPage';
import BuildingsPage from '../buildings/BuildingsPage';
import EmailPage from '../email/EmailPage';
import HomePage from '../home/HomePage';
import Navigation from '../navigation/Navigation';
import ParamsPage from '../params/ParamsPage';
import PasswordForgetPage from '../passwordForget/PasswordForgetPage';
import withAuthentication from '../session/withAuthentication';
import SignInPage from '../signIn/SignInPage';
import UserFormPage from '../users/UserFormPage';
import UsersPage from '../users/UsersPage';

const App = () => (
  <BrowserRouter>
    <div>
      <Navigation />
      <Route exact path={routes.HOME} component={HomePage} />
      <Route path={routes.SIGN_IN} component={SignInPage} />
      <Route path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={routes.ACCOUNT} component={AccountPage} />
      <Route path={routes.PARAMS} component={ParamsPage} />
      <Route path={routes.EMAIL} component={EmailPage} />

      <Route exact path={routes.USERS} component={UsersPage} />
      <Route path={routes.USERS_CREATE} component={UserFormPage} />

      <Route exact path={routes.BUILDINGS} component={BuildingsPage} />
      <Route path={routes.BUILDINGS_CREATE} component={BuildingFormPage} />

      <Route exact path={routes.ASSIGNMENTS} component={AssignmentsPage} />
      <Route path={routes.ASSIGNMENTS_CREATE} component={AssignmentFormPage} />
    </div>
  </BrowserRouter>
);

export default withAuthentication(App);
