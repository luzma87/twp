import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Grid, Paper } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
import CustomTextField from '../_common/CustomTextField';
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
  const [open, setOpen] = useState(false);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    console.log('saving...', personValues.email, personValues.uid);

    // crear el nuevo usuario con los mismos valores q el anterior

    // buscar el usuario nuevo en db y guardar el uid

    // eliminar el usuario anterior en db
    /*
    let userRef = this.database.ref('users/' + userId);
    userRef.remove()
     */

    // buscar el usuario anterior en userPayments

    //      copiar los valores con el nuevo id

    //      eliminar los valores con el antiguo id

    // actualizar el campo user del puesto
  };

  return (
    <Content>
      <Dialog
        fullWidth
        open={open}
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Cambiar de mail
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Nuevo email
          </DialogContentText>
          <CustomTextField
            id="email"
            label="E-mail"
            value={email}
            onChange={(event) => onPersonChange(event)}
            autoComplete="username"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary" autoFocus>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Grid item xs={12} sm={9} md={12} lg={10} xl={8}>
        <Paper style={{ padding: 32 }}>
          <Button variant="outlined" onClick={handleClickOpen}>
            Cambiar mail
          </Button>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomError error={errorMessage} />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardTitle label="Persona" icon="user" themed />
              <PersonForm
                onPersonChange={(event) => onPersonChange(event)}
                personValues={personValues}
                isEditing={isEditing}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardTitle label="Auto" icon="car" themed />
              <CarForm
                onCarChange={(event) => onCarChange(event)}
                carValues={car}
              />
            </Grid>
            <Grid item xs={12} container justify="flex-end">
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ marginTop: 24, width: '100%' }}
                  disabled={isInvalid || isLoading}
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
