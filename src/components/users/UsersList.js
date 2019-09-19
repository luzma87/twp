/* eslint-disable react/no-array-index-key */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import Users from '../../domain/Users';
import MeteorRating from '../_common/meteorRating/MeteorRating';

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
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Admin?</TableCell>
              <TableCell>Cédula</TableCell>
              <TableCell>Parking</TableCell>
              <TableCell>Auto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((person, index) => (
              <TableRow key={`${person.uid}_${index}`}>
                <TableCell>
                  <FontAwesomeIcon
                    icon={['far', 'user-astronaut']}
                    style={{ marginRight: 8, color: person.isActive ? '#2E7D32' : '#B71C1C' }}
                  />
                  <Link to={`${routes.USERS_EDIT_ID}${person.uid}`} style={{ color: 'black' }}>
                    {person.name}
                  </Link>
                </TableCell>
                <TableCell>
                  {person.email}
                </TableCell>
                <TableCell>
                  {person.getIsAdmin() ? (
                    <FontAwesomeIcon
                      icon={['far', 'alicorn']}
                      size="2x"
                    />
                  ) : null}
                </TableCell>
                <TableCell>
                  {person.id}
                </TableCell>
                <TableCell>
                  <MeteorRating id="parkingMeteors" value={person.parkingMeteors} size="lg" compact />
                </TableCell>
                <TableCell>
                  {person.getCarString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
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
