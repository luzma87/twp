import { Hidden, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Buildings from '../../domain/Buildings';
import BuildingsCards from './BuildingsCards';
import BuildingsTable from './BuildingsTable';

const BuildingsList = ({ buildings, activeOnly }) => {
  if (!(buildings instanceof Buildings)) {
    return null;
  }
  const list = buildings.getSorted(activeOnly);
  const activeMessage = activeOnly ? 'sólo activos' : 'todos';
  return (
    <>
      <Typography style={{ marginBottom: 16 }}>
        {`Mostrando ${list.length} / ${buildings.getTotalCount()} edificios (${activeMessage})`}
      </Typography>
      <Hidden smDown>
        <BuildingsTable list={list} />
      </Hidden>
      <Hidden mdUp>
        <BuildingsCards list={list} />
      </Hidden>
    </>
  );
};

BuildingsList.propTypes = {
  buildings: PropTypes.any,
  activeOnly: PropTypes.bool,
};

BuildingsList.defaultProps = {
  buildings: [],
  activeOnly: true,
};

export default BuildingsList;
