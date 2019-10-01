import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box, Button, Grid, Paper, Typography,
} from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import constants from '../../constants/constants';
import shapes from '../../constants/shapes';
import CardTitle from '../_common/CardTitle';
import Content from '../_common/Content';
import PageTitle from '../_common/PageTitle';
import PasswordChangeForm from '../passwordChange/PasswordChangeForm';
import withAuthorization from '../session/withAuthorization';
import CarForm from '../users/CarForm';
import PersonForm from '../users/PersonForm';

const INITIAL_STATE = {
  id: '',
  name: '',
  email: '',
  bank: constants.banks.pichincha.value,
  isAdmin: false,
  isActive: true,
  parkingMeteors: 1,
  parkingDifficulty: 1,
  car: {
    brand: '',
    model: '',
    plate: '',
    size: constants.carSizes.medium.value,
  },
};

const AccountPage = ({ authUser, firebase }) => {
  const [personValues, setValues] = useState(INITIAL_STATE);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setValues({ ...INITIAL_STATE, ...authUser });
  }, [authUser]);

  const onPersonChange = (event) => {
    setValues({ ...personValues, [event.target.name]: event.target.value });
  };

  const onCarChange = (event) => {
    const { name } = event.target;
    let { value } = event.target;
    if (name === 'plate') {
      value = value.toUpperCase();
    }
    const newCar = { ...personValues.car, [name]: value };
    setValues({ ...personValues, car: newCar });
  };

  const onSubmit = (event) => {
    setLoading(true);
    firebase
      .user(personValues.uid)
      .set(personValues).then(() => {
        setLoading(false);
      });
    event.preventDefault();
  };

  const icon = isLoading ? 'spinner' : 'save';
  const isInvalid = personValues.name === ''
    || personValues.car.brand === ''
    || personValues.car.model === ''
    || personValues.car.plate === '';

  const lastPassChange = personValues.lastPassChange
    ? moment(personValues.lastPassChange).format('DD/MM/YYYY')
    : 'nunca, por favor cámbialo';

  return (
    <Content>
      <Grid item xs={12}>
        <PageTitle label="Mi cuenta" />
      </Grid>

      <Grid item xs={12} sm={10} md={11} lg={8} xl={6}>
        <Paper style={{ padding: 16 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <CardTitle label="Actualizar mis datos" icon="user-astronaut" />
              <PersonForm
                onPersonChange={(event) => onPersonChange(event)}
                personValues={personValues}
                isEditing
                restricted
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CardTitle label="Actualizar mi auto" icon="rocket" />
              <CarForm
                onCarChange={(event) => onCarChange(event)}
                carValues={personValues.car}
              />
            </Grid>

            <Grid item container xs={12} justify="flex-end">
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={isInvalid}
                  style={{ marginTop: 24, width: '100%' }}
                  onClick={(event) => onSubmit(event)}
                >
                  <FontAwesomeIcon icon={['far', icon]} pulse={isLoading} style={{ marginRight: 16 }} />
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={10} md={11} lg={8} xl={6}>
        <Paper style={{ padding: 16 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CardTitle label="Cambiar password" icon="unlock-alt" />
            </Grid>
            <Grid item xs={12}>
              <Box
                bgcolor="text.hint"
                color="background.paper"
                style={{ padding: 8, borderRadius: 8, marginTop: 16 }}
              >
                <Typography>
                  {`Último cambio de password: ${lastPassChange}`}
                </Typography>
              </Box>
              <PasswordChangeForm
                user={authUser}
                onPasswordChanged={() => {
                  setValues({ ...personValues, lastPassChange: moment().format() });
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Content>
  );
};

AccountPage.propTypes = {
  authUser: PropTypes.shape(shapes.user).isRequired,
  firebase: PropTypes.any.isRequired,
};

export default compose(
  withAuthorization(conditions.isLoggedUser),
)(AccountPage);
