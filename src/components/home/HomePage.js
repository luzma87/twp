import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import constants from '../../constants/constants';
import Content from '../_common/Content';
import CustomSelect from '../_common/CustomSelect';
import AssignmentsList from '../assignments/AssignmentsList';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';

const ALL_BUILDINGS = {
  value: '-1',
  label: 'Todos',
};

const HomePage = ({ firebase }) => {
  const [buildings, setBuildings] = useState({});
  const [filteredBuildings, setFilteredBuildings] = useState({});
  const [buildingsForFilter, setBuildingsForFilter] = useState({});
  const [filter, setFilter] = useState(ALL_BUILDINGS);
  const [users, setUsers] = useState([]);
  const [loadingBuildings, setLoadingBuildings] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    setLoadingBuildings(true);
    setLoadingUsers(true);
    firebase.users().on('value', (snapshotUsers) => {
      const usersObject = snapshotUsers.val();
      const usedBuildings = [];

      if (usersObject) {
        let usersList = Object.values(usersObject).filter((u) => u.isActive);
        usersList = usersList.sort(constants.userSort);
        setUsers(usersList);
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
          setBuildings(buildingsObject);
          setFilteredBuildings(buildingsObject);

          const availableBuildings = {};
          const allBuildings = Object.values(buildingsObject);
          const activeBuildings = allBuildings.filter((b) => b.isActive);
          availableBuildings['-1'] = ALL_BUILDINGS;
          activeBuildings.forEach((building) => {
            if (usedBuildings.indexOf(building.uid) !== -1) {
              availableBuildings[building.uid] = {
                value: building,
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
    let newBuildings = {};
    if (selectedValue === ALL_BUILDINGS) {
      newBuildings = buildings;
    } else {
      Object.values(buildings).forEach((building) => {
        if (building === selectedValue.value) {
          newBuildings[building.uid] = building;
        }
      });
    }
    setFilteredBuildings(newBuildings);
  };

  return (
    <Content>
      {(loadingBuildings || loadingUsers) && (
        <Typography color="secondary">
          <FontAwesomeIcon
            icon={['far', 'spinner']}
            pulse
            size="4x"
          />
        </Typography>
      )}
      <CustomSelect
        id="filter"
        value={filter}
        label="Edificio"
        values={buildingsForFilter}
        onChange={(event) => onFilterChange(event)}
      />
      <br />
      <br />
      <AssignmentsList buildings={filteredBuildings} users={users} />
    </Content>
  );
};

HomePage.propTypes = {
  firebase: PropTypes.any.isRequired,
};

export default compose(
  withAuthorization(conditions.isLoggedUser),
  withFirebase,
)(HomePage);
