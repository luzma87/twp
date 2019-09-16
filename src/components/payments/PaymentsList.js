import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import numeral from 'numeral';
import React from 'react';
import PropTypes from 'prop-types';

const PaymentsList = ({ payments }) => (
  <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Edificio</TableCell>
          <TableCell>Dueño</TableCell>
          <TableCell>Puestos</TableCell>
          <TableCell>Total</TableCell>
          <TableCell>Done?</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {payments.map((element) => {
          const {
            owner, places, building, total,
          } = element;
          const ownerKey = `${building.id}_${owner}`;
          return (
            <TableRow key={ownerKey}>
              <TableCell>{building.name}</TableCell>
              <TableCell>{owner}</TableCell>
              <TableCell>
                {places.map((place) => (
                  <div key={`${ownerKey}_${place.number}`} style={{ display: 'flex' }}>
                    <div style={{ width: 50 }}>
                      {place.number}
                    </div>
                    <div>
                      {numeral(place.price).format('$0,0.00')}
                    </div>
                  </div>
                ))}
              </TableCell>
              <TableCell>{numeral(total).format('$0,0.00')}</TableCell>
              <TableCell><input type="checkbox" /></TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </Paper>
);

PaymentsList.propTypes = {
  payments: PropTypes.any,
};

PaymentsList.defaultProps = {
  payments: [],
};

export default PaymentsList;
