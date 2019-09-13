/* eslint-disable react/no-array-index-key */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import React from 'react';
import shapes from '../../constants/shapes';
import MeteorRating from '../_common/meteorRating/MeteorRating';

const UsersList = ({ users }) => (
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
        {
          Object.values(users).map((person, index) => (
            <TableRow key={`${person.uid}_${index}`}>
              <TableCell>
                <FontAwesomeIcon
                  icon={['far', 'user-astronaut']}
                  style={{ marginRight: 8, color: person.isActive ? '#2E7D32' : '#B71C1C' }}
                />
                {person.name}
              </TableCell>
              <TableCell>
                {person.email}
              </TableCell>
              <TableCell>
                {person.isAdmin ? (
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
                {person.car ? `${person.car.brand} ${person.car.model}` : ''}
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  </Paper>
);

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape(shapes.user)),
};

UsersList.defaultProps = {
  users: [],
};

export default UsersList;
