import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Grid, Paper } from '@material-ui/core';
import { omit } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import roles from '../../constants/roles';
import routes from '../../constants/routes';
import CardTitle from '../_common/CardTitle';
import Content from '../_common/Content';
import CustomError from '../_common/CustomError';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';
import PersonForm from './PersonForm';

const INITIAL_STATE = {
  id: '',
  name: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  isActive: true,
  bikeType: 'bike',
  hasBike: true,
  elements: 'controlCard',
};

const BikeFormPage = ({ firebase, history, match }) => {
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
      history.push(routes.BIKES);
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
          history.push(routes.BIKES);
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
  } = personValues;

  let isInvalid = passwordOne !== passwordTwo
    || passwordOne === ''
    || email === ''
    || id === ''
    || name === '';
  if (isEditing) {
    isInvalid = email === ''
      || id === ''
      || name === '';
  }
  const icon = isLoading ? 'spinner' : 'save';

  return (
    <Content>
      <Grid item xs={12} sm={9} md={12} lg={10} xl={8}>
        <Paper style={{ padding: 32 }}>
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
                isBike
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

BikeFormPage.propTypes = {
  firebase: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
  match: PropTypes.object.isRequired,
};

export default compose(
  withAuthorization(conditions.isAdminUser),
  withFirebase,
  withRouter,
)(BikeFormPage);
