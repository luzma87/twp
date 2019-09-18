import { omit } from 'lodash';
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
  value: `${building.id}&&${place.number}`,
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
  const [errorMessage, setErrorMessage] = React.useState(null);

  useEffect(() => {
    setLoadingBuildings(true);
    setLoadingUsers(true);
    const availableUsersEdit = {};
    const takenPlaces = [];
    const availablePlacesEdit = {};
    firebase.users().on('value', (snapshot) => {
      const usersObject = snapshot.val();
      const usedBuildings = [];
      let usersList;
      if (usersObject) {
        usersList = Object.values(usersObject).filter((u) => u.isActive);
        usersList = usersList.sort(constants.userSort);
        usersList.forEach((u) => {
          if (u.place && usedBuildings.indexOf(u.place.building) === -1) {
            usedBuildings.push(u.place.building);
          }
          if (u.place === undefined) {
            availableUsersEdit[u.uid] = createUserForSelect(u);
          } else {
            takenPlaces.push(`${u.place.building}_${u.place.place}`);
          }
        });
        setAvailableUsers(availableUsersEdit);
      }

      firebase.buildings().on('value', (snapshotBuildings) => {
        const buildingsObject = snapshotBuildings.val();
        if (buildingsObject) {
          setAssignments(new Assignments(usersList, buildingsObject));

          const availableBuildings = {};
          const allBuildings = Object.values(buildingsObject);
          const activeBuildings = allBuildings.filter((b) => b.isActive);
          availableBuildings['-1'] = ALL_BUILDINGS;
          activeBuildings.forEach((building) => {
            if (usedBuildings.indexOf(building.uid) !== -1) {
              availableBuildings[building.uid] = {
                value: building.uid,
                label: building.name,
              };
            }
            const allPlaces = Object.values(building.places);
            const activePlaces = allPlaces.filter((p) => p.isActive);
            activePlaces.forEach((place) => {
              const placeKey = `${building.uid}_${place.number}`;
              if (takenPlaces.indexOf(placeKey) === -1) {
                const newBuilding = omit(building, 'places');
                availablePlacesEdit[placeKey] = createPlaceForSelect(newBuilding, place);
              }
            });
          });
          setAvailablePlaces(availablePlacesEdit);
          setBuildingsForFilter(availableBuildings);
        }
        setLoadingBuildings(false);
      });
      setLoadingUsers(false);
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
    const selectedValue = event.target.value;
    setFilter(selectedValue);
  };

  const onDelete = (uid, building, place) => {
    updateAssignment(uid, building, place, true);
  };

  return (
    <Content>
      <CustomLoader isLoading={loadingBuildings || loadingUsers} />

      <CustomError error={errorMessage} />
      <AssignmentForm
        assignmentValues={assignmentValues}
        places={availablePlaces}
        users={availableUsers}
        onChange={(event) => onAssignmentChange(event)}
        onSubmit={(event) => onSubmit(event)}
        isLoading={loadingSave}
      />

      <div style={{ marginBottom: 16 }}>
        <CustomSelect
          id="filter"
          value={filter}
          label="Edificio"
          values={buildingsForFilter}
          onChange={(event) => onFilterChange(event)}
        />
      </div>

      <AssignmentsList
        assignments={assignments}
        buildingFilter={filter}
        skill
        onDelete={(uid, building, place) => onDelete(uid, building, place)}
      />
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
