import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import CustomError from "../_common/CustomError";
import withFirebase from '../firebase/withFirebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const PasswordChangeForm = ({ firebase }) => {
  const [values, setValues] = useState(INITIAL_STATE);
  const [isLoading, setLoading] = useState(false);
  const [isDone, setDone] = useState(false);

  const onSubmit = (event) => {
    setLoading(true);
    const { passwordOne } = values;
    firebase
      .doPasswordUpdate(passwordOne)
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

  const { passwordOne, passwordTwo, error } = values;
  const isInvalid = passwordOne !== passwordTwo || passwordOne === '';
  const icon = isLoading ? 'spinner' : 'repeat';

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div>
        <TextField
          id="passwordOne"
          label="Nuevo password"
          onChange={(event) => onChange(event)}
          margin="normal"
          variant="outlined"
          type="password"
          name="passwordOne"
          value={passwordOne}
        />
      </div>
      <div>
        <TextField
          id="passwordTwo"
          label="Confirmar password"
          onChange={(event) => onChange(event)}
          margin="normal"
          variant="outlined"
          type="password"
          name="passwordTwo"
          value={passwordTwo}
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
        Cambiar
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
            Password cambiado :)
          </Typography>
        </Box>
      ) : null}
    </form>
  );
};

PasswordChangeForm.propTypes = {
  firebase: PropTypes.any.isRequired,
};

export default withFirebase(PasswordChangeForm);
