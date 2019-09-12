import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import routes from '../../constants/routes';
import Content from '../_common/Content';
import CreateButton from '../_common/CreateButton';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';
import BuildingsList from './BuildingsList';

const BuildingsPage = ({ firebase }) => {
  const [buildings, setBuildings] = useState([]);
  const [filteredBuildings, setFilteredBuildings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Mostrando solo edificios activos');


  useEffect(() => {
    setLoading(true);
    firebase.buildings().on('value', (snapshot) => {
      const buildingsObject = snapshot.val();
      if (buildingsObject) {
        const buildingsList = Object.values(buildingsObject);
        setBuildings(buildingsList);
        const activeBuildings = buildingsList.filter((b) => b.isActive);
        setFilteredBuildings(activeBuildings);
      }
      setLoading(false);
    });

    return function cleanup() {
      firebase.buildings().off();
    };
  }, [firebase]);

  const filterActive = (flag) => {
    let newBuildingsList;
    if (flag) {
      newBuildingsList = buildings.filter((u) => u.isActive);
    } else {
      newBuildingsList = buildings;
      setMessage('Mostrando todos los edificios');
    }
    setFilteredBuildings(newBuildingsList);
  };

  return (
    <Content>
      {loading && (
        <Typography color="secondary">
          <FontAwesomeIcon
            icon={['far', 'spinner']}
            pulse
            size="4x"
          />
        </Typography>
      )}
      <div>
        <CreateButton linkTo={routes.BUILDINGS_CREATE} />
        <Button style={{ marginBottom: 16 }} onClick={() => filterActive(true)}>
          <FontAwesomeIcon icon={['far', 'warehouse']} style={{ marginRight: 8 }} color="#2E7D32" />
          Mostrar solo activos
        </Button>
        <Button style={{ marginBottom: 16 }} onClick={() => filterActive(false)}>
          <FontAwesomeIcon icon={['far', 'warehouse']} style={{ marginRight: 8 }} color="#B71C1C" />
          Mostrar todos
        </Button>
      </div>
      <Typography>
        {message}
      </Typography>
      <BuildingsList buildings={filteredBuildings} />
    </Content>
  );
};

BuildingsPage.propTypes = {
  firebase: PropTypes.any.isRequired,
};
export default compose(
  withAuthorization(conditions.isAdminUser),
  withFirebase,
)(BuildingsPage);
