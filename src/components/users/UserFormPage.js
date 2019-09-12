import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { compose } from 'recompose';
import { omit } from 'lodash';
import conditions from '../../constants/conditions';
import constants from '../../constants/constants';
import roles from '../../constants/roles';
import Content from '../_common/Content';
import CustomError from '../_common/CustomError';
import CustomForm from '../_common/CustomForm';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';
import CarForm from './CarForm';
import PersonForm from './PersonForm';

const INITIAL_STATE = {
  id: '',
  name: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
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

const UserFormPage = ({ firebase }) => {
  const [personValues, setValues] = React.useState(INITIAL_STATE);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const onPersonChange = (event) => {
    setValues({ ...personValues, [event.target.name]: event.target.value });
  };

  const onCarChange = (event) => {
    const newCar = { ...personValues.car, [event.target.name]: event.target.value };
    setValues({ ...personValues, car: newCar });
  };

  const onSubmit = (event) => {
    setLoading(true);
    const { email, passwordOne, isAdmin } = personValues;

    const userRoles = {};

    if (isAdmin) {
      userRoles[roles.ADMIN] = roles.ADMIN;
    }

    const newUser = omit(personValues, ['passwordOne', 'passwordTwo']);
    newUser.roles = userRoles;

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        const { uid } = authUser.user;
        newUser.uid = uid;
        firebase
          .user(uid)
          .set(newUser);
      })
      .then(() => {
        setValues(INITIAL_STATE);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error);
        setLoading(false);
      });
    event.preventDefault();
  };

  const {
    name,
    email,
    passwordOne,
    passwordTwo,
    id,
    car,
  } = personValues;

  const isInvalid = passwordOne !== passwordTwo
    || passwordOne === ''
    || email === ''
    || id === ''
    || name === ''
    || car.brand === ''
    || car.model === ''
    || car.plate === '';
  const icon = isLoading ? 'spinner' : 'save';

  return (
    <Content>
      <CustomError error={errorMessage} />
      <CustomForm onSubmit={(event) => onSubmit(event)}>
        <Paper style={{ padding: 32 }}>
          <Typography variant="h5">
            <FontAwesomeIcon icon={['far', 'user-astronaut']} style={{ marginRight: 16 }} />
            Persona
          </Typography>
          <PersonForm
            onPersonChange={(event) => onPersonChange(event)}
            personValues={personValues}
          />
        </Paper>
        <Paper style={{ padding: 32 }}>
          <Typography variant="h5">
            <FontAwesomeIcon icon={['far', 'rocket']} style={{ marginRight: 16 }} />
            Auto
          </Typography>
          <CarForm
            onCarChange={(event) => onCarChange(event)}
            carValues={car}
          />
        </Paper>
        <div />
        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ margin: '24px 0' }}
            disabled={isInvalid || isLoading}
            onClick={(event) => onSubmit(event)}
          >
            <FontAwesomeIcon icon={['far', icon]} pulse={isLoading} style={{ marginRight: 16 }} />
            Guardar
          </Button>
        </div>
      </CustomForm>
    </Content>
  );
};

UserFormPage.propTypes = {
  firebase: PropTypes.any.isRequired,
};

export default compose(
  withAuthorization(conditions.isAdminUser),
  withFirebase,
)(UserFormPage);
