import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import routes from '../../constants/routes';
import CustomError from '../_common/CustomError';
import withFirebase from '../firebase/withFirebase';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const SignInFormBase = ({ firebase, history }) => {
  const [values, setValues] = useState(INITIAL_STATE);
  const [isLoading, setLoading] = useState(false);

  const onSubmit = (event) => {
    setLoading(true);
    const { email, password } = values;
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setValues(INITIAL_STATE);
        history.push(routes.HOME);
      })
      .catch((error) => {
        setValues({ ...values, error });
      });
    event.preventDefault();
  };

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const { email, password, error } = values;
  const isInvalid = password === '' || email === '';
  const icon = isLoading ? 'spinner' : 'sign-in-alt';
  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div>
        <TextField
          id="email"
          label="Email"
          onChange={(event) => onChange(event)}
          margin="normal"
          variant="outlined"
          type="email"
          name="email"
          value={email}
          autoComplete="username email"
        />
      </div>
      <div>
        <TextField
          id="password"
          label="Password"
          onChange={(event) => onChange(event)}
          margin="normal"
          variant="outlined"
          type="password"
          name="password"
          value={password}
          autoComplete="current-password"
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ margin: '24px 0' }}
        disabled={isInvalid || isLoading}
        onClick={(event) => onSubmit(event)}
      >
        <FontAwesomeIcon icon={['far', icon]} pulse={isLoading} style={{ marginRight: 16 }} />
            Entrar
      </Button>
      <CustomError error={error} />
    </form>
  );
};

SignInFormBase.propTypes = {
  firebase: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
};

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInForm;
