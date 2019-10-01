import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Paper, Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import ActiveIndicator from "../_common/ActiveIndicator";
import MeteorRating from '../_common/meteorRating/MeteorRating';

const UsersTable = ({ list }) => (
  <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
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
          <TableRow key={person.uid}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <ActiveIndicator isActive={person.isActive} icon="user-astronaut" />
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
);

UsersTable.propTypes = {
  list: PropTypes.any,
};

UsersTable.defaultProps = {
  list: [],
};

export default UsersTable;
