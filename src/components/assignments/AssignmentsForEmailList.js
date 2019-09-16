import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import React from 'react';

const AssignmentsForEmailList = ({ assignments }) => {
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
          Object.values(assignments).map((assignment) => {
            const { user, place } = assignment;
            index += 1;
            return (
              <TableRow key={user}>
                <TableCell className="email-table" align="center">
                  {index}
                </TableCell>
                <TableCell className="email-table">
                  {user}
                </TableCell>
                <TableCell className="email-table">
                  {place}
                </TableCell>
              </TableRow>
            );
          })
        }
      </TableBody>
    </Table>
  );
};

AssignmentsForEmailList.propTypes = {
  assignments: PropTypes.any,
};

AssignmentsForEmailList.defaultProps = {
  assignments: {},
};

export default AssignmentsForEmailList;
