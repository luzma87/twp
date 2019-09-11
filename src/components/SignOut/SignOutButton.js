import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import React from 'react';
import withFirebase from '../Firebase/withFirebase';


const SignOutButton = ({ firebase }) => (
  <Tooltip title="Salir">
    <IconButton aria-label="Salir" color="inherit" onClick={() => firebase.doSignOut()}>
      <FontAwesomeIcon icon={['far', 'sign-out-alt']} color="white" />
    </IconButton>
  </Tooltip>
);

SignOutButton.propTypes = {
  firebase: PropTypes.any.isRequired,
};

export default withFirebase(SignOutButton);
