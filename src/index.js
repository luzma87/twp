import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSignInAlt, faSignOutAlt,
  faUserAstronaut, faSpaceShuttle,
  faEye, faEyeSlash,
  faMeteor as farMeteor
} from '@fortawesome/pro-regular-svg-icons';
import { faMeteor as fasMeteor } from '@fortawesome/pro-solid-svg-icons';
import PropTypes from "prop-types";
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import BuildingsList from './components/buildings/BuildingsList';
import Main from './components/Home';
import Login from './components/Login';
import NotFound from './components/NotFound';
import PeopleList from './components/people/PeopleList';
import PersonForm from './components/people/PersonForm';
import PersonPayments from './components/people/PersonPayments';
import Placeholder from './components/Placeholder';
import GlobalProvider from './context/GlobalProvider';
import GlobalContext from './context/MyContext';
import './index.css';
import routes from './routes';
import * as serviceWorker from './serviceWorker';

library.add(
  faSignInAlt, faSignOutAlt, faUserAstronaut, faSpaceShuttle,
  faEye, faEyeSlash,
  farMeteor, fasMeteor
);

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props => (
      <GlobalContext.Consumer>
        {state => (state.currentUser
          ? <Component {...props} />
          : <Redirect to={{pathname: routes.login(), state: {from: props.location}}} />)}
      </GlobalContext.Consumer>
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  location: PropTypes.any,
};

ReactDOM.render(
  <GlobalProvider>
    <BrowserRouter>
      <Switch>
        <Route path={routes.login()} component={Login} />
        <PrivateRoute path={routes.personPayments()} component={PersonPayments} />
        <PrivateRoute path={routes.personCarForm()} component={Placeholder} />
        <PrivateRoute path={routes.personForm()} component={PersonForm} />
        <PrivateRoute path={routes.personList()} component={PeopleList} />
        <PrivateRoute path={routes.buildingPlaceForm()} component={Placeholder} />
        <PrivateRoute path={routes.buildingForm()} component={Placeholder} />
        <PrivateRoute path={routes.buildingList()} component={BuildingsList} />
        <PrivateRoute path={routes.assign()} component={Placeholder} />
        <PrivateRoute path={routes.checkPayments()} component={Placeholder} />
        <PrivateRoute path={routes.home()} component={Main} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </GlobalProvider>,
  document.getElementById('root'),
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
