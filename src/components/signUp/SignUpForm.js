import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import roles from '../../constants/roles';
import routes from '../../constants/routes';
import withFirebase from '../firebase/withFirebase';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

const SignUpFormBase = ({ firebase, history }) => {
  const [values, setValues] = useState(INITIAL_STATE);

  const onChangeCheckbox = (event) => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    const {
      username, email, passwordOne, isAdmin,
    } = values;

    const userRoles = {};

    if (isAdmin) {
      userRoles[roles.ADMIN] = roles.ADMIN;
    }
    const newUser = {
      username,
      email,
      roles: userRoles,
    };

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        firebase
          .user(authUser.user.uid)
          .set(newUser);
      })
      .then(() => {
        setValues(INITIAL_STATE);
        history.push(routes.HOME);
      })
      .catch((error) => {
        setValues({ ...values, error });
      });
    event.preventDefault();
  };

  const {
    username,
    email,
    passwordOne,
    passwordTwo,
    isAdmin,
    error,
  } = values;

  const isInvalid = passwordOne !== passwordTwo
    || passwordOne === ''
    || email === ''
    || username === '';

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <input
        name="username"
        value={username}
        onChange={(event) => onChange(event)}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={email}
        onChange={(event) => onChange(event)}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={(event) => onChange(event)}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={(event) => onChange(event)}
        type="password"
        placeholder="Confirm Password"
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>
        Admin:
        <input
          name="isAdmin"
          type="checkbox"
          checked={isAdmin}
          onChange={(event) => onChangeCheckbox(event)}
        />
      </label>
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

SignUpFormBase.propTypes = {
  firebase: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
};

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpForm;
