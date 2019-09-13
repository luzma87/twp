/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import routes from '../../constants/routes';
import withFirebase from '../firebase/withFirebase';
import AuthUserContext from './context';

const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      const { firebase, history } = this.props;
      this.listener = firebase.onAuthUserListener(
        (authUser) => {
          if (!condition(authUser)) {
            history.push(routes.SIGN_IN);
          }
        },
        () => history.push(routes.SIGN_IN),
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {(authUser) => (condition(authUser)
            ? (<Component authUser={authUser} {...this.props} />)
            : null)}
        </AuthUserContext.Consumer>
      );
    }
  }

  WithAuthorization.propTypes = {
    firebase: PropTypes.any.isRequired,
    history: PropTypes.any.isRequired,
  };

  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};


export default withAuthorization;
