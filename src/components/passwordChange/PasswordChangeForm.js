import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box, Button, Grid, Typography,
} from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import CustomError from '../_common/CustomError';
import CustomTextField from '../_common/CustomTextField';
import withFirebase from '../firebase/withFirebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const PasswordChangeForm = ({ firebase, user, onPasswordChanged }) => {
  const [values, setValues] = useState(INITIAL_STATE);
  const [isLoading, setLoading] = useState(false);
  const [isDone, setDone] = useState(false);

  const onSubmit = (event) => {
    setLoading(true);
    const { passwordOne } = values;
    firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        const { uid } = user;
        const newUser = { ...user };
        newUser.lastPassChange = moment().format();
        firebase
          .user(uid)
          .set(newUser);
        setValues(INITIAL_STATE);
        setLoading(false);
        setDone(true);
        onPasswordChanged();
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

  const style = {
    display: 'flex', flexWrap: 'wrap', flexDirection: 'column',
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} style={style}>
          <CustomTextField
            id="passwordOne"
            label="Nuevo password"
            onChange={(event) => onChange(event)}
            type="password"
            autoComplete="new-password"
            value={passwordOne}
          />
        </Grid>
        <Grid item xs={12} md={6} style={style}>
          <CustomTextField
            id="passwordTwo"
            label="Confirmar password"
            onChange={(event) => onChange(event)}
            type="password"
            autoComplete="new-password"
            value={passwordTwo}
          />
        </Grid>
        <Grid item container xs={12} justify="flex-end">
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ marginTop: 24, width: '100%' }}
              disabled={isInvalid || isLoading}
              onClick={(event) => onSubmit(event)}
            >
            Cambiar
              <FontAwesomeIcon icon={['far', icon]} pulse={isLoading} style={{ marginLeft: 16 }} />
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </form>
  );
};

PasswordChangeForm.propTypes = {
  onPasswordChanged: PropTypes.func.isRequired,
  firebase: PropTypes.any.isRequired,
  user: PropTypes.any,
};

PasswordChangeForm.defaultProps = {
  user: {},
};

export default withFirebase(PasswordChangeForm);
