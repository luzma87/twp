import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    firebase.buildings().on('value', (snapshot) => {
      const buildingsObject = snapshot.val();
      if (buildingsObject) {
        const buildingsList = Object.keys(buildingsObject).map((key) => ({
          ...buildingsObject[key],
          uid: key,
        }));
        setBuildings(buildingsList);
      }
      setLoading(false);
    });

    return function cleanup() {
      firebase.buildings().off();
    };
  }, [firebase]);

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
      <CreateButton linkTo={routes.BUILDINGS_CREATE} />
      <BuildingsList buildings={buildings} />
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
