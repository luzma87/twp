import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import React from 'react';
import shapes from '../../constants/shapes';

const AssignmentsForEmailList = ({ buildings, users }) => {
  let index = 0;
  return (
    <Table size="small" className="email-table">
      <TableHead>
        <TableRow>
          <TableCell className="email-table header" />
          <TableCell className="email-table header">Persona</TableCell>
          <TableCell className="email-table header">Puesto</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          Object.values(users).map((user) => {
            if (user.place) {
              const building = buildings[user.place.building];
              if (building) {
                const place = building.places[user.place.place];
                index += 1;
                return (
                  <TableRow key={user.uid}>
                    <TableCell className="email-table" align="center">
                      {index}
                    </TableCell>
                    <TableCell className="email-table">
                      {user.name}
                    </TableCell>
                    <TableCell className="email-table">
                      {`${building.name} #${place.number}`}
                    </TableCell>
                  </TableRow>
                );
              }
            }
            return null;
          })
        }
      </TableBody>
    </Table>
  );
};

AssignmentsForEmailList.propTypes = {
  buildings: PropTypes.shape({}),
  users: PropTypes.arrayOf(PropTypes.shape(shapes.user)),
};

AssignmentsForEmailList.defaultProps = {
  buildings: {},
  users: [],
};

export default AssignmentsForEmailList;
