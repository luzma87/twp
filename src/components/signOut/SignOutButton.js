import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import withFirebase from '../firebase/withFirebase';


const SignOutButton = ({ firebase }) => (
  <Tooltip title="Salir">
    <IconButton
      data-cy="logout-nav-button"
      aria-label="Salir"
      color="inherit"
      onClick={() => firebase.doSignOut()}
    >
      <FontAwesomeIcon icon={['far', 'sign-out-alt']} color="white" />
    </IconButton>
  </Tooltip>
);

SignOutButton.propTypes = {
  firebase: PropTypes.any.isRequired,
};

export default withFirebase(SignOutButton);
