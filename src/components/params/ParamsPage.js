import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import Content from '../_common/Content';
import CustomError from '../_common/CustomError';
import CustomLoader from '../_common/CustomLoader';
import CustomTextField from '../_common/CustomTextField';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';

const INITIAL_STATE = {
  defaultBank: 'pichincha',
  differentBank: 0,
  hosting: 0,
  accountInfo: '',
  emailText: '',
  shameEmailText: '',
  oneTimeExtra: 0,
};

const ParamsPage = ({ firebase }) => {
  const [params, setParams] = useState(INITIAL_STATE);
  const [isLoading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  useEffect(() => {
    setLoading(true);
    firebase.params().on('value', (snapshot) => {
      const paramsObject = snapshot.val();
      if (paramsObject) {
        setParams({ ...INITIAL_STATE, ...paramsObject });
      }
      setLoading(false);
    });

    return function cleanup() {
      firebase.params().off();
    };
  }, [firebase]);

  const onParamChange = (event) => {
    setParams({ ...params, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    setLoadingSave(true);

    firebase
      .params()
      .set(params)
      .then(() => {
        setLoadingSave(false);
      })
      .catch((error) => {
        setErrorMessage(error);
        setLoadingSave(false);
      });
    event.preventDefault();
  };

  const icon = isLoading ? 'spinner' : 'save';
  const isInvalid = params.emailText === '';

  return (
    <Content>
      <CustomError error={errorMessage} />
      <CustomLoader isLoading={isLoading} />
      <form
        style={{
          display: 'grid',
          gridTemplateColumns: '500px',
          gridColumnGap: 72,
        }}
        onSubmit={(event) => onSubmit(event)}
      >
        <Paper style={{ padding: 32 }}>
          <Typography variant="h5">
            <FontAwesomeIcon icon={['far', 'alicorn']} style={{ marginRight: 16 }} />
            Params
          </Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
            <CustomTextField
              id="defaultBank"
              label="Banco default"
              value={params.defaultBank}
              onChange={(event) => onParamChange(event)}
            />
            <CustomTextField
              id="differentBank"
              label="Extra por otro banco"
              value={params.differentBank.toString(10)}
              onChange={(event) => onParamChange(event)}
            />
            <CustomTextField
              id="hosting"
              label="Costo hosting"
              value={params.hosting.toString(10)}
              onChange={(event) => onParamChange(event)}
            />
            <CustomTextField
              id="oneTimeExtra"
              label="Costo adicional (ej. compra controles)"
              value={params.oneTimeExtra.toString(10)}
              onChange={(event) => onParamChange(event)}
            />
            <CustomTextField
              id="accountInfo"
              label="Info cuenta"
              multiline
              rows={4}
              value={params.accountInfo}
              onChange={(event) => onParamChange(event)}
            />
            <CustomTextField
              id="emailText"
              label="Texto email"
              multiline
              rows={6}
              value={params.emailText}
              onChange={(event) => onParamChange(event)}
            />
            <CustomTextField
              id="shameEmailText"
              label="Texto email recordatorio"
              multiline
              rows={6}
              value={params.shameEmailText}
              onChange={(event) => onParamChange(event)}
            />
          </div>
        </Paper>
        <div />
        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ margin: '24px 0' }}
            disabled={isInvalid || loadingSave || isLoading}
            onClick={(event) => onSubmit(event)}
          >
            <FontAwesomeIcon icon={['far', icon]} pulse={loadingSave} style={{ marginRight: 16 }} />
            Guardar
          </Button>
        </div>
      </form>
    </Content>
  );
};

ParamsPage.propTypes = {
  firebase: PropTypes.any.isRequired,
};

export default compose(
  withAuthorization(conditions.isAdminUser),
  withFirebase,
)(ParamsPage);
