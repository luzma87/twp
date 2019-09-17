import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

const AssignmentsForEmailList = ({ assignments, check, shame }) => {
  let index = 0;
  let list = Object.values(assignments).sort((a, b) => {
    if (a.user < b.user) {
      return -1;
    }
    if (a.user > b.user) {
      return 1;
    }
    return 0;
  });
  if (shame) {
    list = list.filter((e) => e.payed === undefined);
  }

  return (
    <Table size="small" className="email-table">
      <TableHead>
        <TableRow>
          <TableCell className="email-table header" />
          <TableCell className="email-table header">Persona</TableCell>
          <TableCell className="email-table header">Puesto</TableCell>
          {check ? <TableCell className="email-table header">Pagado</TableCell> : null}
        </TableRow>
      </TableHead>
      <TableBody>
        {
          list.map((assignment) => {
            const { user, place, payed } = assignment;
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
                {check ? (
                  <TableCell className="email-table">
                    {payed ? moment(payed).format('DD/MM/YYYY HH:mm') : null}
                  </TableCell>
                ) : null}
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
  check: PropTypes.bool,
  shame: PropTypes.bool,
};

AssignmentsForEmailList.defaultProps = {
  assignments: {},
  check: false,
  shame: false,
};

export default AssignmentsForEmailList;
