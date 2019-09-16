import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import routes from '../../constants/routes';
import Buildings from '../../domain/Buildings';
import Content from '../_common/Content';
import CreateButton from '../_common/CreateButton';
import CustomLoader from '../_common/CustomLoader';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';
import BuildingsList from './BuildingsList';

const BuildingsPage = ({ firebase }) => {
  const [isLoading, setLoading] = useState(false);
  const [activeOnly, setActiveOnly] = useState(true);
  const [buildings, setBuildings] = useState([]);


  useEffect(() => {
    setLoading(true);
    firebase.buildings().on('value', (snapshot) => {
      const buildingsObject = snapshot.val();
      setBuildings(new Buildings(buildingsObject));
      setLoading(false);
    });

    return function cleanup() {
      firebase.buildings().off();
    };
  }, [firebase]);

  const filterActive = (flag) => {
    setActiveOnly(flag);
  };
  return (
    <Content>
      <CustomLoader isLoading={isLoading} />
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
      <BuildingsList buildings={buildings} activeOnly={activeOnly} />
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
