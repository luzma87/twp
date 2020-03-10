import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import constants from '../../constants/constants';
import Assignments from '../../domain/Assignments';
import Content from '../_common/Content';
import CustomError from '../_common/CustomError';
import CustomLoader from '../_common/CustomLoader';
import CustomSelect from '../_common/CustomSelect';
import CustomTextField from '../_common/CustomTextField';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';
import AssignmentForm from './AssignmentForm';
import AssignmentsList from './AssignmentsList';

const ALL_BUILDINGS = {
  value: '-1',
  label: 'Todos',
};

const INITIAL_STATE = {
  place: {},
  user: {},
};

const createUserForSelect = (user) => ({
  value: user.uid,
  label: `${user.name} (${user.parkingMeteors}*)`,
});

const createPlaceForSelect = (building, place) => ({
  value: `${building.id}&&${place.id}`,
  label: `${building.name} #${place.number} (${place.difficulty}*)`,
});

const AssignmentsPage = ({ firebase }) => {
  const [assignmentValues, setValues] = React.useState(INITIAL_STATE);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingBuildings, setLoadingBuildings] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [buildingsForFilter, setBuildingsForFilter] = useState({});
  const [availablePlaces, setAvailablePlaces] = useState({});
  const [availableUsers, setAvailableUsers] = useState({});
  const [filter, setFilter] = useState(ALL_BUILDINGS.value);
  const [textFilter, setTextFilter] = useState('');
  const [errorMessage, setErrorMessage] = React.useState(null);

  useEffect(() => {
    setLoadingBuildings(true);
    setLoadingUsers(true);
    const buildingsForFilterEdit = {};
    let availableUsersEdit = {};
    const availablePlacesEdit = {};

    firebase.users().on('value', (snapshotUsers) => {
      const usersObject = snapshotUsers.val();
      let usersList = [];
      if (usersObject) {
        usersList = Object.values(usersObject).filter((u) => u.isActive);
        usersList = usersList.sort(constants.userSort);

        const filteredAvailableUsers = usersList
          .filter((u) => u.place === undefined && u.car !== undefined);
        availableUsersEdit = filteredAvailableUsers.reduce((acc, user, index) => {
          acc[`${index}_${user.uid}`] = createUserForSelect(user);
          return acc;
        }, {});
        setAvailableUsers(availableUsersEdit);
      }
      setLoadingUsers(false);
      firebase.buildings().on('value', (snapshotBuildings) => {
        const buildingsObject = snapshotBuildings.val();
        if (buildingsObject) {
          setAssignments(new Assignments(usersList, buildingsObject));
          const buildingsList = Object.values(buildingsObject).filter((u) => u.isActive);
          buildingsForFilterEdit['-1'] = ALL_BUILDINGS;
          const usedBuildings = buildingsList.filter((building) => {
            const places = Object.values(building.places);
            const occupiedPlaces = places.filter((p) => p.user !== undefined).length;
            return occupiedPlaces > 0;
          });
          usedBuildings.forEach((building) => {
            buildingsForFilterEdit[building.uid] = {
              value: building.uid,
              label: building.name,
            };
          });
          setBuildingsForFilter(buildingsForFilterEdit);

          let freePlacesList = [];
          buildingsList.forEach((building) => {
            const places = Object.values(building.places);
            const freePlaces = places.filter((p) => p.user === undefined);
            freePlaces.forEach((place) => {
              if (place.isActive) {
                const placeKey = `${building.uid}_${place.id}`;
                freePlacesList.push({ select: createPlaceForSelect(building, place), placeKey });
              }
            });
          });
          freePlacesList = freePlacesList.sort((a, b) => {
            if (a.select.label < b.select.label) {
              return -1;
            }
            if (a.select.label > b.select.label) {
              return 1;
            }
            return 0;
          });
          freePlacesList.reduce((acc, place) => {
            acc[place.placeKey] = place.select;
            return acc;
          }, availablePlacesEdit);
        }
        setAvailablePlaces(availablePlacesEdit);
        setLoadingBuildings(false);
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

  const updateAssignment = (uid, building, place, isDelete) => {
    setLoadingSave(true);
    const placeValue = isDelete ? null : { building, place };
    const userValue = isDelete ? null : uid;
    const updates = {};
    updates[`users/${uid}/place/`] = placeValue;
    updates[`buildings/${building}/places/${place}/user`] = userValue;
    firebase.databaseRef().update(updates)
      .then(() => {
        setValues(INITIAL_STATE);
        setLoadingSave(false);
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  const onSubmit = (event) => {
    const [building, place] = assignmentValues.place.split('&&');
    const { user } = assignmentValues;
    updateAssignment(user, building, place, false);
    event.preventDefault();
  };

  const onFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const onTextFilterChange = (event) => {
    setTextFilter(event.target.value);
  };

  const onDelete = (uid, building, place) => {
    updateAssignment(uid, building, place, true);
  };

  return (
    <Content>
      <Grid item xs={12}>
        <CustomLoader isLoading={loadingBuildings || loadingUsers} />
      </Grid>
      <Grid item xs={12}>
        <CustomError error={errorMessage} />
      </Grid>
      <Grid item xs={12}>
        <AssignmentForm
          assignmentValues={assignmentValues}
          places={availablePlaces}
          users={availableUsers}
          onChange={(event) => onAssignmentChange(event)}
          onSubmit={(event) => onSubmit(event)}
          isLoading={loadingSave}
        />
      </Grid>

      <Grid item xs={5} md={3} lg={2}>
        <CustomSelect
          id="filter"
          value={filter}
          label="Edificio"
          values={buildingsForFilter}
          onChange={(event) => onFilterChange(event)}
        />
      </Grid>
      <Grid item xs={5} md={3} lg={2}>
        <CustomTextField
          onChange={(event) => onTextFilterChange(event)}
          label="Filtrar"
          id="textFilter"
          value={textFilter}
        />
      </Grid>

      <Grid item xs={12}>
        <AssignmentsList
          assignments={assignments}
          buildingFilter={filter}
          textFilter={textFilter}
          onDelete={(uid, building, place) => onDelete(uid, building, place)}
        />
      </Grid>
    </Content>
  );
};

AssignmentsPage.propTypes = {
  firebase: PropTypes.any.isRequired,
};

export default compose(
  withAuthorization(conditions.isAdminUser),
  withFirebase,
)(AssignmentsPage);
