import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import constants from '../../constants/constants';
import shapes from '../../constants/shapes';
import Assignments from '../../domain/Assignments';
import Content from '../_common/Content';
import CustomLoader from '../_common/CustomLoader';
import CustomSelect from '../_common/CustomSelect';
import AssignmentsList from './AssignmentsList';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';

const ALL_BUILDINGS = {
  value: '-1',
  label: 'Todos',
};

const UserAssignmentsPage = ({ firebase, authUser }) => {
  const [buildingsForFilter, setBuildingsForFilter] = useState({});
  const [filter, setFilter] = useState(ALL_BUILDINGS.value);
  const [loadingBuildings, setLoadingBuildings] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    setLoadingBuildings(true);
    setLoadingUsers(true);
    firebase.users().on('value', (snapshotUsers) => {
      const usersObject = snapshotUsers.val();
      const usedBuildings = [];
      let usersList;
      if (usersObject) {
        usersList = Object.values(usersObject).filter((u) => u.isActive);
        usersList = usersList.sort(constants.userSort);
        usersList.forEach((u) => {
          if (u.place && usedBuildings.indexOf(u.place.building) === -1) {
            usedBuildings.push(u.place.building);
          }
        });
      }
      setLoadingUsers(false);

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
          });
          setBuildingsForFilter(availableBuildings);
        }
        setLoadingBuildings(false);
      });
    });

    return function cleanup() {
      firebase.buildings().off();
      firebase.users().off();
    };
  }, [firebase]);

  const onFilterChange = (event) => {
    const selectedValue = event.target.value;
    setFilter(selectedValue);
  };

  let myAssignment;
  if (assignments && assignments.assignments) {
    myAssignment = assignments.assignments.find((a) => a.user.uid === authUser.uid);
  }
  return (
    <Content>
      <CustomLoader isLoading={loadingBuildings || loadingUsers} />

      {myAssignment ? (
        <Paper style={{
          marginTop: 24, marginBottom: 24, padding: 16, width: 350,
        }}
        >
          <Typography variant="h5" style={{ marginBottom: 16 }}>Mi puesto</Typography>
          {`${myAssignment.building.name} ${myAssignment.placeId}`}
        </Paper>
      ) : null}

      <div style={{ marginBottom: 16 }}>
        <CustomSelect
          id="filter"
          value={filter}
          label="Edificio"
          values={buildingsForFilter}
          onChange={(event) => onFilterChange(event)}
        />
      </div>
      <AssignmentsList assignments={assignments} buildingFilter={filter} />
    </Content>
  );
};

UserAssignmentsPage.propTypes = {
  authUser: PropTypes.shape(shapes.user).isRequired,
  firebase: PropTypes.any.isRequired,
};

export default compose(
  withAuthorization(conditions.isLoggedUser),
  withFirebase,
)(UserAssignmentsPage);
