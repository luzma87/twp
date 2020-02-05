/* eslint-disable react/no-array-index-key */
import { Hidden, Typography } from '@material-ui/core';
import { union } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Users from '../../domain/Users';
import BikesTable from './BikesTable';
import UsersCards from './UsersCards';

const BikesList = ({ users, activeOnly, textFilter }) => {
  if (!(users instanceof Users)) {
    return null;
  }

  let list = users.getSortedBikes(activeOnly);

  if (textFilter.length > 0) {
    const searchString = textFilter.toLowerCase();
    const filteredByPerson = list.filter((a) => a.name.toLowerCase().includes(searchString));
    const filteredByEmail = list.filter((a) => a.email.toLowerCase().includes(searchString));
    const filteredByType = list.filter((a) => a.bikeType.toLowerCase().includes(searchString));
    list = union(filteredByPerson, filteredByEmail, filteredByType);
  }

  const activeMessage = activeOnly ? 'sólo activos' : 'todos';
  return (
    <>
      <Typography style={{ marginBottom: 16 }}>
        {`Mostrando ${list.length} / ${users.getTotalBikeCount()} usuarios (${activeMessage})`}
      </Typography>
      <Hidden smDown>
        <BikesTable list={list} textFilter={textFilter} />
      </Hidden>
      <Hidden mdUp>
        <UsersCards list={list} textFilter={textFilter} />
      </Hidden>
    </>
  );
};

BikesList.propTypes = {
  users: PropTypes.any,
  activeOnly: PropTypes.bool,
  textFilter: PropTypes.any,
};

BikesList.defaultProps = {
  users: [],
  activeOnly: true,
  textFilter: '',
};

export default BikesList;
