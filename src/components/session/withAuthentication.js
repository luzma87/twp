import PropTypes from 'prop-types';
import React from 'react';
import withFirebase from '../firebase/withFirebase';
import AuthUserContext from './context';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      const { firebase } = this.props;
      this.listener = firebase.onAuthUserListener(
        (authUser) => {
          this.setState({ authUser });
        },
        () => {
          this.setState({ authUser: null });
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      const { authUser } = this.state;
      return (
        <AuthUserContext.Provider value={authUser}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  WithAuthentication.propTypes = {
    firebase: PropTypes.any.isRequired,
  };

  return withFirebase(WithAuthentication);
};
export default withAuthentication;
