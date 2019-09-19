import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Paper } from '@material-ui/core';
import { omit } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import constants from '../../constants/constants';
import roles from '../../constants/roles';
import routes from '../../constants/routes';
import CardTitle from '../_common/CardTitle';
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
  bank: constants.banks.pichincha.value,
  isAdmin: false,
  isActive: true,
  parkingMeteors: 1,
  car: {
    brand: '',
    model: '',
    plate: '',
    size: constants.carSizes.medium.value,
  },
};

const UserFormPage = ({ firebase, history, match }) => {
  const editId = match.params.id;
  const [personValues, setValues] = useState(INITIAL_STATE);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    if (editId !== undefined) {
      firebase.user(editId).on('value', (snapshot) => {
        const editUser = snapshot.val();
        setValues({ ...INITIAL_STATE, ...editUser });
        setEditing(true);
      });
    }

    return function cleanup() {
      firebase.users().off();
    };
  }, [firebase, editId]);

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
    const { email, passwordOne, isAdmin } = personValues;

    const userRoles = {};

    if (isAdmin) {
      userRoles[roles.ADMIN] = roles.ADMIN;
    }

    const newUser = omit(personValues, ['passwordOne', 'passwordTwo']);
    newUser.roles = userRoles;

    if (isEditing) {
      firebase
        .user(editId)
        .set(newUser).then(() => {
          setLoading(false);
        });
      history.push(routes.USERS);
    } else {
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
          history.push(routes.USERS);
        })
        .catch((error) => {
          setErrorMessage(error);
          setLoading(false);
        });
    }
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

  let isInvalid = passwordOne !== passwordTwo
    || passwordOne === ''
    || email === ''
    || id === ''
    || name === ''
    || car.brand === ''
    || car.model === ''
    || car.plate === '';
  if (isEditing) {
    isInvalid = email === ''
      || id === ''
      || name === ''
      || car.brand === ''
      || car.model === ''
      || car.plate === '';
  }
  const icon = isLoading ? 'spinner' : 'save';

  return (
    <Content>
      <CustomError error={errorMessage} />
      <CustomForm onSubmit={(event) => onSubmit(event)}>
        <Paper style={{ padding: 32 }}>
          <CardTitle label="Persona" icon="user-astronaut" />
          <PersonForm
            onPersonChange={(event) => onPersonChange(event)}
            personValues={personValues}
            isEditing={isEditing}
          />
        </Paper>
        <Paper style={{ padding: 32 }}>
          <CardTitle label="Auto" icon="rocket" />
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
  history: PropTypes.any.isRequired,
  match: PropTypes.object.isRequired,
};

export default compose(
  withAuthorization(conditions.isAdminUser),
  withFirebase,
  withRouter,
)(UserFormPage);
