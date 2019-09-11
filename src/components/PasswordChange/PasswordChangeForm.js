import PropTypes from 'prop-types';
import React, { useState } from 'react';
import withFirebase from '../Firebase/withFirebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const PasswordChangeForm = ({ firebase }) => {
  const [values, setValues] = useState(INITIAL_STATE);

  const onSubmit = (event) => {
    const { passwordOne } = values;
    firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        setValues(INITIAL_STATE);
      })
      .catch((error) => {
        setValues({ ...values, error });
      });
    event.preventDefault();
  };

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const { passwordOne, passwordTwo, error } = values;
  const isInvalid = passwordOne !== passwordTwo || passwordOne === '';
  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={(event) => onChange(event)}
        type="password"
        placeholder="New Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={(event) => onChange(event)}
        type="password"
        placeholder="Confirm New Password"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

PasswordChangeForm.propTypes = {
  firebase: PropTypes.any.isRequired,
};

export default withFirebase(PasswordChangeForm);
