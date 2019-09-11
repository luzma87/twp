import React from 'react';
import PropTypes from 'prop-types';
import withFirebase from '../Firebase/withFirebase';

const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={() => firebase.doSignOut()}>
    Sign Out
  </button>
);

SignOutButton.propTypes = {
  firebase: PropTypes.any.isRequired,
};

export default withFirebase(SignOutButton);
