import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import routes from '../../constants/routes';
import withFirebase from '../Firebase/withFirebase';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const SignInFormBase = ({ firebase, history }) => {
  const [values, setValues] = useState(INITIAL_STATE);

  const onSubmit = (event) => {
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
  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <input
        name="email"
        value={email}
        onChange={(event) => onChange(event)}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={password}
        onChange={(event) => onChange(event)}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>
      {error && <p>{error.message}</p>}
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
