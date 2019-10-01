import { Button, Grid } from '@material-ui/core';
import { withTheme } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';

import conditions from '../../constants/conditions';
import routes from '../../constants/routes';
import Buildings from '../../domain/Buildings';
import ActiveIndicator from '../_common/ActiveIndicator';
import Content from '../_common/Content';
import CreateButton from '../_common/CreateButton';
import CustomLoader from '../_common/CustomLoader';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';
import BuildingsList from './BuildingsList';

const BuildingsPage = ({ firebase, theme }) => {
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

  return (
    <Content>
      <Grid item xs={12}>
        <CustomLoader isLoading={isLoading} />
      </Grid>
      <Grid item container xs={12}>
        <Grid item>
          <CreateButton linkTo={routes.BUILDINGS_CREATE} />
        </Grid>
        <Grid item>
          <Button style={{ marginBottom: 16 }} onClick={() => setActiveOnly(true)}>
            <ActiveIndicator isActive icon="building" themed />
            Mostrar solo activos
          </Button>
        </Grid>
        <Grid item>
          <Button style={{ marginBottom: 16 }} onClick={() => setActiveOnly(false)}>
            <ActiveIndicator isActive={false} icon="building" themed />
            Mostrar todos
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <BuildingsList buildings={buildings} activeOnly={activeOnly} />
      </Grid>
    </Content>
  );
};

BuildingsPage.propTypes = {
  firebase: PropTypes.any.isRequired,
  theme: PropTypes.any.isRequired,
};
export default compose(
  withAuthorization(conditions.isAdminUser),
  withFirebase,
  withTheme,
)(BuildingsPage);
