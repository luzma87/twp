import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from '../../constants/routes';
import AccountPage from '../Account/AccountPage';
import AdminPage from '../Admin/AdminPage';
import HomePage from '../Home/HomePage';
import LandingPage from '../Landing/LandingPage';
import Navigation from '../Navigation/Navigation';
import PasswordForgetPage from '../PasswordForget/PasswordForgetPage';
import withAuthentication from '../Session/withAuthentication';
import SignInPage from '../SignIn/SignInPage';
import SignUpPage from '../SignUp/SignUpPage';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={routes.LANDING} component={LandingPage} />
      <Route path={routes.SIGN_UP} component={SignUpPage} />
      <Route path={routes.SIGN_IN} component={SignInPage} />
      <Route path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={routes.HOME} component={HomePage} />
      <Route path={routes.ACCOUNT} component={AccountPage} />
      <Route path={routes.ADMIN} component={AdminPage} />
    </div>
  </Router>
);

export default withAuthentication(App);
