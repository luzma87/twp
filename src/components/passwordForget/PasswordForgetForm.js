import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box, Button, TextField, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import CustomError from '../_common/CustomError';
import withFirebase from '../firebase/withFirebase';

const INITIAL_STATE = {
  email: '',
  error: null,
};

const PasswordForgetFormBase = ({ firebase }) => {
  const [values, setValues] = useState(INITIAL_STATE);
  const [isLoading, setLoading] = useState(false);
  const [isDone, setDone] = useState(false);

  const onSubmit = (event) => {
    setLoading(true);
    const { email } = values;
    firebase
      .doPasswordReset(email)
      .then(() => {
        setValues(INITIAL_STATE);
        setLoading(false);
        setDone(true);
      })
      .catch((error) => {
        setValues({ ...values, error });
        setLoading(false);
      });
    event.preventDefault();
  };

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const { email, error } = values;
  const isInvalid = email === '';
  const icon = isLoading ? 'spinner' : 'paper-plane';
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
        Recuperar
        <FontAwesomeIcon icon={['far', icon]} pulse={isLoading} style={{ marginLeft: 16 }} />
      </Button>
      <CustomError error={error} />
      {!error && isDone ? (
        <Box
          bgcolor="secondary.main"
          color="secondary.contrastText"
          style={{ padding: 8, borderRadius: 8, marginTop: 16 }}
        >
          <Typography>
              Email con recuperación de password enviado :)
          </Typography>
        </Box>
      ) : null}
    </form>
  );
};

PasswordForgetFormBase.propTypes = {
  firebase: PropTypes.any.isRequired,
};

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export default PasswordForgetForm;
