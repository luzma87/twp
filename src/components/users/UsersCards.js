import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import UserCard from './UserCard';

const UsersCards = ({ list }) => (
  <Grid container spacing={2}>
    {list.map((person) => (
      <Grid key={person.uid} item xs={12} sm={6}>
        <UserCard person={person} />
      </Grid>
    ))}
  </Grid>
);

UsersCards.propTypes = {
  list: PropTypes.any,
};

UsersCards.defaultProps = {
  list: [],
};

export default UsersCards;
