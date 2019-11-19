import {
  Paper, Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import ActiveIndicator from '../_common/ActiveIndicator';
import MeteorRating from '../_common/meteorRating/MeteorRating';
import UsersBank from './UsersBank';

const getIcon = (isAdmin) => (isAdmin ? 'admin' : 'user');

const UsersTable = ({ list }) => (
  <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Nombre</TableCell>
          <TableCell>E-mail</TableCell>
          <TableCell>Cédula</TableCell>
          <TableCell>Banco</TableCell>
          <TableCell>Parking</TableCell>
          <TableCell>Auto</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {list.map((person, index) => (
          <TableRow key={person.uid}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <ActiveIndicator isActive={person.isActive} icon={getIcon(person.isAdmin)} themed />
              <Link to={`${routes.USERS_EDIT_ID}${person.uid}`} style={{ color: 'black' }}>
                {person.name}
              </Link>
            </TableCell>
            <TableCell>
              {person.email}
            </TableCell>
            <TableCell>
              {person.id}
            </TableCell>
            <TableCell>
              <UsersBank bank={person.bank} />
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
);

UsersTable.propTypes = {
  list: PropTypes.any,
};

UsersTable.defaultProps = {
  list: [],
};

export default UsersTable;
