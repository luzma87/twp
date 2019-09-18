import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import constants from '../../constants/constants';
import routes from '../../constants/routes';
import Assignments from '../../domain/Assignments';
import Content from '../_common/Content';
import CreateButton from '../_common/CreateButton';
import CustomLoader from '../_common/CustomLoader';
import CustomSelect from '../_common/CustomSelect';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';
import AssignmentsList from './AssignmentsList';

const ALL_BUILDINGS = {
  value: '-1',
  label: 'Todos',
};

const AssignmentsPage = ({ firebase }) => {
  const [loadingBuildings, setLoadingBuildings] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [buildingsForFilter, setBuildingsForFilter] = useState({});
  const [filter, setFilter] = useState(ALL_BUILDINGS.value);

  useEffect(() => {
    setLoadingBuildings(true);
    setLoadingUsers(true);
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
        });
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
          });
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

  const onFilterChange = (event) => {
    const selectedValue = event.target.value;
    setFilter(selectedValue);
  };

  const onDelete = (uid) => {
    const updates = {};
    updates[`users/${uid}/place/`] = null;
    firebase.databaseRef().update(updates);
  };

  return (
    <Content>
      <CustomLoader isLoading={loadingBuildings || loadingUsers} />
      <CreateButton linkTo={routes.ASSIGNMENTS_CREATE} />

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
        onDelete={(uid) => onDelete(uid)}
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
