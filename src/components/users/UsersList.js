/* eslint-disable react/no-array-index-key */
import { Hidden, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { union } from 'lodash';
import React from 'react';
import Users from '../../domain/Users';
import UsersCards from './UsersCards';
import UsersTable from './UsersTable';

const UsersList = ({ users, activeOnly, textFilter }) => {
  if (!(users instanceof Users)) {
    return null;
  }

  let list = users.getSorted(activeOnly);

  if (textFilter.length > 0) {
    const searchString = textFilter.toLowerCase();
    const filteredByPerson = list.filter((a) => a.name.toLowerCase().includes(searchString));
    const filteredByBank = list.filter((a) => a.bank.toLowerCase().includes(searchString));
    const filteredByEmail = list.filter((a) => a.email.toLowerCase().includes(searchString));
    const filteredByPlate = list.filter((a) => a.car.plate.toLowerCase().includes(searchString));
    const filteredByCarBrand = list.filter((a) => a.car.brand.toLowerCase().includes(searchString));
    const filteredByCarModel = list.filter((a) => a.car.model.toLowerCase().includes(searchString));
    list = union(filteredByPerson, filteredByEmail, filteredByBank,
      filteredByPlate, filteredByCarBrand, filteredByCarModel);
  }

  const activeMessage = activeOnly ? 'sólo activos' : 'todos';
  return (
    <>
      <Typography style={{ marginBottom: 16 }}>
        {`Mostrando ${list.length} / ${users.getTotalCount()} usuarios (${activeMessage})`}
      </Typography>
      <Hidden smDown>
        <UsersTable list={list} textFilter={textFilter} />
      </Hidden>
      <Hidden mdUp>
        <UsersCards list={list} textFilter={textFilter} />
      </Hidden>
    </>
  );
};

UsersList.propTypes = {
  users: PropTypes.any,
  activeOnly: PropTypes.bool,
  textFilter: PropTypes.any,
};

UsersList.defaultProps = {
  users: [],
  activeOnly: true,
  textFilter: '',
};

export default UsersList;
