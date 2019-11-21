import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button, Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

const AssignmentsForUpdateTable = ({ assignments, handleOpenModal }) => {
  if (!assignments) return null;
  const listWithIds = Object.entries(assignments).map(([id, value]) => ({ ...value, id }));
  const list = listWithIds.sort((a, b) => {
    if (a.user < b.user) {
      return -1;
    }
    if (a.user > b.user) {
      return 1;
    }
    return 0;
  });
  let index = 0;
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Persona</TableCell>
          <TableCell>Puesto</TableCell>
          <TableCell>Pagado</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {
          list.map((assignment) => {
            const { id, user, place, payed } = assignment;
            index += 1;
            return (
              <TableRow key={user}>
                <TableCell align="center">
                  {index}
                </TableCell>
                <TableCell>
                  {user}
                </TableCell>
                <TableCell>
                  {place}
                </TableCell>
                <TableCell>
                  {payed ? moment(payed).format('DD/MM/YYYY HH:mm') : null}
                </TableCell>
                <TableCell>
                  <Button color="primary" variant="outlined" onClick={() => handleOpenModal(id, user, place)}>
                    <FontAwesomeIcon icon={['far', 'trash-alt']} />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })
        }
      </TableBody>
    </Table>
  );
};

AssignmentsForUpdateTable.propTypes = {
  assignments: PropTypes.any,
  handleOpenModal: PropTypes.func,
};

AssignmentsForUpdateTable.defaultProps = {
  assignments: {},
  handleOpenModal: () => {},
};

export default AssignmentsForUpdateTable;
