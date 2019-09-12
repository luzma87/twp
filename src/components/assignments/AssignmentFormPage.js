import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
import { omit } from 'lodash';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import Content from '../_common/Content';
import CustomError from '../_common/CustomError';
import CustomForm from '../_common/CustomForm';
import CustomSelect from '../_common/CustomSelect';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';

const INITIAL_STATE = {
  place: {},
  user: {},
};

const AssignmentFormPage = ({ firebase }) => {
  const [assignmentValues, setValues] = React.useState(INITIAL_STATE);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [places, setPlaces] = useState({});
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const createUserForSelect = (user) => ({
    value: user,
    label: `${user.name} (${user.parkingMeteors}*)`,
  });

  const createPlaceForSelect = (building, place) => ({
    value: {
      building,
      place,
    },
    label: `${building.name} #${place.number} (${place.difficulty}*)`,
  });

  const processUsers = (usersObject) => {
    const availableUsers = {};
    const takenPlaces = [];
    if (usersObject) {
      const allUsers = Object.values(usersObject);
      const activeUsers = allUsers.filter((u) => u.isActive);
      activeUsers.forEach((user) => {
        if (user.place === undefined) {
          availableUsers[user.uid] = createUserForSelect(user);
        } else {
          takenPlaces.push(`${user.place.building}_${user.place.place}`);
        }
      });
    }
    return { availableUsers, takenPlaces };
  };

  const processBuildings = (buildingsObject, takenPlaces) => {
    const availablePlaces = {};
    if (buildingsObject) {
      const allBuildings = Object.values(buildingsObject);
      const activeBuildings = allBuildings.filter((b) => b.isActive);
      activeBuildings.forEach((building) => {
        const allPlaces = Object.values(building.places);
        const activePlaces = allPlaces.filter((p) => p.isActive);
        activePlaces.forEach((place) => {
          const placeKey = `${building.uid}_${place.number}`;
          if (takenPlaces.indexOf(placeKey) === -1) {
            const newBuilding = omit(building, 'places');
            availablePlaces[placeKey] = createPlaceForSelect(newBuilding, place);
          }
        });
      });
    }
    return availablePlaces;
  };

  useEffect(() => {
    setLoadingPlaces(true);
    setLoadingUsers(true);
    firebase.users().on('value', (snapshotUsers) => {
      const usersObject = snapshotUsers.val();
      const { availableUsers, takenPlaces } = processUsers(usersObject);
      setUsers(availableUsers);
      setLoadingUsers(false);

      firebase.buildings().on('value', (snapshotBuildings) => {
        const buildingsObject = snapshotBuildings.val();
        const availablePlaces = processBuildings(buildingsObject, takenPlaces);
        setPlaces(availablePlaces);
        setLoadingPlaces(false);
      });
    });

    return function cleanup() {
      firebase.buildings().off();
      firebase.users().off();
    };
  }, [firebase]);

  const onAssignmentChange = (event) => {
    setValues({ ...assignmentValues, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    setLoading(true);
    const newUser = assignmentValues.user.value;
    newUser.place = {
      building: assignmentValues.place.value.building.uid,
      place: assignmentValues.place.value.place.number,
    };

    firebase
      .user(assignmentValues.user.value.uid)
      .set(newUser)
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

  const isInvalid = Object.keys(assignmentValues.place).length === 0
    || Object.keys(assignmentValues.user).length === 0;

  const isLoading = loadingPlaces || loadingUsers;
  const icon = isLoading ? 'spinner' : 'save';

  return (
    <Content>
      <CustomError error={errorMessage} />
      {(isLoading) && (
        <Typography color="secondary">
          <FontAwesomeIcon
            icon={['far', 'spinner']}
            pulse
            size="4x"
          />
        </Typography>
      )}
      <CustomForm onSubmit={(event) => onSubmit(event)}>
        <Paper style={{ padding: 32 }}>
          <Typography variant="h5">
            <FontAwesomeIcon icon={['far', 'rocket']} style={{ marginRight: 16 }} />
            Asignación
          </Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
            <CustomSelect
              id="user"
              value={assignmentValues.user}
              label="Persona"
              values={users}
              onChange={(event) => onAssignmentChange(event)}
            />
            <CustomSelect
              id="place"
              value={assignmentValues.place}
              label="Puesto"
              values={places}
              onChange={(event) => onAssignmentChange(event)}
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
            disabled={isInvalid || (isLoading)}
            onClick={(event) => onSubmit(event)}
          >
            <FontAwesomeIcon icon={['far', icon]} pulse={loading} style={{ marginRight: 16 }} />
            Guardar
          </Button>
        </div>
      </CustomForm>
    </Content>
  );
};

AssignmentFormPage.propTypes = {
  firebase: PropTypes.any.isRequired,
};

AssignmentFormPage.defaultProps = {};

export default compose(
  withAuthorization(conditions.isAdminUser),
  withFirebase,
)(AssignmentFormPage);
