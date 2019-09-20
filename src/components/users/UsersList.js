/* eslint-disable react/no-array-index-key */
import { Hidden, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Users from '../../domain/Users';
import UsersCards from './UsersCards';
import UsersTable from './UsersTable';

const UsersList = ({ users, activeOnly }) => {
  if (!(users instanceof Users)) {
    return null;
  }
  const list = users.getSorted(activeOnly);
  const activeMessage = activeOnly ? 'sólo activos' : 'todos';
  return (
    <>
      <Typography style={{ marginBottom: 16 }}>
        {`Mostrando ${list.length} usuarios (${activeMessage})`}
      </Typography>
      <Hidden smDown>
        <UsersTable list={list} />
      </Hidden>
      <Hidden mdUp>
        <UsersCards list={list} />
      </Hidden>
    </>
  );
};

UsersList.propTypes = {
  users: PropTypes.any,
  activeOnly: PropTypes.bool,
};

UsersList.defaultProps = {
  users: [],
  activeOnly: true,
};

export default UsersList;
