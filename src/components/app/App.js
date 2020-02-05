import {
  amber, green, grey, purple, red,
} from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import routes from '../../constants/routes';
import AccountPage from '../account/AccountPage';
import AssignmentsPage from '../assignments/AssignmentsPage';
import AssignmentsUpdatesPage from '../assignments/AssignmentsUpdatesPage';
import BuildingFormPage from '../buildings/BuildingFormPage';
import BuildingsPage from '../buildings/BuildingsPage';
import AssignmentEmailPage from '../email/AssignmentEmailPage';
import ShameEmailPage from '../email/ShameEmailPage';
import Navigation from '../navigation/Navigation';
import ParamsPage from '../params/ParamsPage';
import PasswordForgetPage from '../passwordForget/PasswordForgetPage';
import PaymentsPage from '../payments/PaymentsPage';
import withAuthentication from '../session/withAuthentication';
import SignInPage from '../signIn/SignInPage';
import UserPaymentPage from '../userPayments/UserPaymentPage';
import UsersPaymentsPage from '../userPayments/UsersPaymentsPage';
import BikeFormPage from '../users/BikeFormPage';
import BikesPage from '../users/BikesPage';
import UserFormPage from '../users/UserFormPage';
import UsersPage from '../users/UsersPage';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: amber,
    active: green,
    inactive: red,
    titleButton: grey,
  },
  icons: {
    building: 'warehouse',
    place: 'draw-square',
    user: 'user-astronaut',
    admin: 'alicorn',
    car: 'rocket',
    bike: 'starfighter-alt',
  },
});
const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Navigation />
      <Route exact path={routes.HOME} component={UserPaymentPage} />
      <Route path={routes.SIGN_IN} component={SignInPage} />
      <Route path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={routes.ACCOUNT} component={AccountPage} />
      <Route path={routes.PARAMS} component={ParamsPage} />
      <Route path={routes.ASSIGNMENT_EMAIL} component={AssignmentEmailPage} />
      <Route path={routes.SHAME_EMAIL} component={ShameEmailPage} />

      <Route exact path={routes.USERS} component={UsersPage} />
      <Route path={routes.USERS_CREATE} component={UserFormPage} />
      <Route path={routes.USERS_EDIT} component={UserFormPage} />

      <Route exact path={routes.BUILDINGS} component={BuildingsPage} />
      <Route path={routes.BUILDINGS_CREATE} component={BuildingFormPage} />
      <Route path={routes.BUILDINGS_EDIT} component={BuildingFormPage} />

      <Route exact path={routes.ASSIGNMENTS} component={AssignmentsPage} />
      <Route exact path={routes.ASSIGNMENTS_UPDATE} component={AssignmentsUpdatesPage} />

      <Route exact path={routes.PAYMENTS} component={PaymentsPage} />

      <Route path={routes.USER_PAYMENT} component={UserPaymentPage} />
      <Route path={routes.ALL_USERS_PAYMENTS} component={UsersPaymentsPage} />

      <Route exact path={routes.BIKES} component={BikesPage} />
      <Route path={routes.BIKES_CREATE} component={BikeFormPage} />
      <Route path={routes.BIKES_EDIT} component={BikeFormPage} />
    </ThemeProvider>
  </BrowserRouter>
);

export default withAuthentication(App);
