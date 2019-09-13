import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Paper, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import constants from '../../constants/constants';
import shapes from '../../constants/shapes';
import Content from '../_common/Content';
import PasswordChangeForm from '../passwordChange/PasswordChangeForm';
import withAuthorization from '../session/withAuthorization';
import CarForm from '../users/CarForm';
import PersonForm from '../users/PersonForm';

const INITIAL_STATE = {
  id: '',
  name: '',
  email: '',
  bank: constants.banks.pichincha,
  isAdmin: false,
  isActive: true,
  parkingMeteors: 1,
  car: {
    brand: '',
    model: '',
    plate: '',
    size: constants.carSizes.medium,
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

  return (
    <Content>
      <Typography variant="h4">
        Mi cuenta
      </Typography>

      <div style={{ marginBottom: 32, marginTop: 24, width: 680 }}>
        <Paper style={{
          padding: 16,
          display: 'grid',
          gridColumnGap: 48,
          gridTemplateColumns: '300px 300px',
        }}
        >
          <div>
            <Typography variant="h5">Actualizar mis datos</Typography>
            <PersonForm
              onPersonChange={(event) => onPersonChange(event)}
              personValues={personValues}
              isEditing
              restricted
            />
          </div>

          <div>
            <Typography variant="h5">Actualizar mi auto</Typography>
            <CarForm
              onCarChange={(event) => onCarChange(event)}
              carValues={personValues.car}
            />
          </div>

          <div />
          <div style={{ marginTop: 24, textAlign: 'right' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={isInvalid}
              style={{ margin: '24px 0' }}
              onClick={(event) => onSubmit(event)}
            >
              <FontAwesomeIcon icon={['far', icon]} pulse={isLoading} style={{ marginRight: 16 }} />
              Guardar
            </Button>
          </div>
        </Paper>
      </div>

      <Paper style={{ padding: 16, width: 648 }}>
        <Typography variant="h5">Cambiar Password</Typography>
        <PasswordChangeForm />
      </Paper>
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
