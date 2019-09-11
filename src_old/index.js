import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAlicorn,
  faDrawSquare,
  faEye,
  faEyeSlash,
  faGhost,
  faMeteor as farMeteor,
  faPlusHexagon,
  faRocket,
  faSave,
  faSignInAlt,
  faSignOutAlt,
  faTrashAlt,
  faUserAstronaut,
  faWarehouse,
} from '@fortawesome/pro-regular-svg-icons';
import { faMeteor as fasMeteor } from '@fortawesome/pro-solid-svg-icons';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import AssignmentsList from './components/assign/AssignmentsList';
import BuildingPlaceForm from './components/buildings/BuildingPlaceForm';
import BuildingsList from './components/buildings/BuildingsList';
import BuildingsListContainer from "./components/buildings/BuildingsListContainer";
import Main from './components/Home';
import Login from './components/Login';
import NotFound from './components/NotFound';
import PeopleList from './components/people/PeopleList';
import PersonCarForm from './components/people/PersonCarForm';
import PersonPayments from './components/people/PersonPayments';
import Placeholder from './components/Placeholder';
import GlobalProvider from './context/GlobalProvider';
import GlobalContext from './context/MyContext';
import './index.css';
import routes from './routes';
import * as serviceWorker from './serviceWorker';

library.add(
  faSignInAlt, faSignOutAlt, faUserAstronaut, faRocket,
  faEye, faEyeSlash, faSave, faPlusHexagon,
  farMeteor, fasMeteor, faAlicorn, faWarehouse,
  faDrawSquare, faTrashAlt, faGhost,
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <GlobalContext.Consumer>
        {(state) => (state.currentUser
          ? <Component {...props} />
          : <Redirect to={{ pathname: routes.login(), state: { from: props.location } }} />)}
      </GlobalContext.Consumer>
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  location: PropTypes.any,
};

PrivateRoute.defaultProps = {
  location: null,
};

ReactDOM.render(
  <GlobalProvider>
    <BrowserRouter>
      <Switch>
        <Route path={routes.login()} component={Login} />
        <PrivateRoute path={routes.personPayments()} component={PersonPayments} />
        <PrivateRoute path={routes.personForm()} component={PersonCarForm} />
        <PrivateRoute path={routes.personList()} component={PeopleList} />
        <PrivateRoute path={routes.buildingForm()} component={BuildingPlaceForm} />
        <PrivateRoute path={routes.buildingList()} component={BuildingsListContainer} />
        <PrivateRoute path={routes.assignments()} component={AssignmentsList} />
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
