import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import BikeCard from './BikeCard';

const BikesCards = ({ list, textFilter }) => (
  <Grid container spacing={2}>
    {list.map((person, index) => (
      <Grid key={person.uid} item xs={12} sm={6}>
        <BikeCard person={person} index={index + 1} textFilter={textFilter} />
      </Grid>
    ))}
  </Grid>
);

BikesCards.propTypes = {
  list: PropTypes.any,
  textFilter: PropTypes.any,
};

BikesCards.defaultProps = {
  list: [],
  textFilter: '',
};

export default BikesCards;
