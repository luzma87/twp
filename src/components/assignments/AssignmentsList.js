import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import React from 'react';
import shapes from '../../constants/shapes';

const AssignmentsList = ({ buildings, users }) => (
  <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Persona</TableCell>
          <TableCell>Auto</TableCell>
          <TableCell>Puesto</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          Object.values(users).map((user) => {
            if (user.place) {
              const building = buildings[user.place.building];
              const place = building.places[user.place.place];
              return (
                <TableRow key={user.uid}>
                  <TableCell>
                    {user.name}
                  </TableCell>
                  <TableCell>
                    {`${user.car.brand} ${user.car.model} [${user.car.plate}]`}
                  </TableCell>
                  <TableCell>
                    {`${building.name} #${place.number}`}
                  </TableCell>
                </TableRow>
              );
            }
            return null;
          })
        }
      </TableBody>
    </Table>
  </Paper>
);

AssignmentsList.propTypes = {
  buildings: PropTypes.shape({}),
  users: PropTypes.arrayOf(PropTypes.shape(shapes.user)),
};

AssignmentsList.defaultProps = {
  buildings: {},
  users: [],
};

export default AssignmentsList;
