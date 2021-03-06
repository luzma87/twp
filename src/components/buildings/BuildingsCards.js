import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import BuildingCard from './BuildingCard';

const BuildingsCards = ({ list }) => (
  <Grid container spacing={2}>
    {list.map((building, index) => (
      <Grid key={building.id} item xs={12} sm={6}>
        <BuildingCard building={building} index={index + 1} />
      </Grid>
    ))}
  </Grid>
);

BuildingsCards.propTypes = {
  list: PropTypes.any,
};

BuildingsCards.defaultProps = {
  list: [],
};

export default BuildingsCards;
