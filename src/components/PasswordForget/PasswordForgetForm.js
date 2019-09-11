import PropTypes from 'prop-types';
import React, { useState } from 'react';
import withFirebase from '../Firebase/withFirebase';

const INITIAL_STATE = {
  email: '',
  error: null,
};

const PasswordForgetFormBase = ({ firebase }) => {
  const [values, setValues] = useState(INITIAL_STATE);

  const onSubmit = (event) => {
    const { email } = values;
    firebase
      .doPasswordReset(email)
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

  const { email, error } = values;
  const isInvalid = email === '';
  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <input
        name="email"
        value={email}
        onChange={(event) => onChange(event)}
        type="text"
        placeholder="Email Address"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

PasswordForgetFormBase.propTypes = {
  firebase: PropTypes.any.isRequired,
};

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export default PasswordForgetForm;
