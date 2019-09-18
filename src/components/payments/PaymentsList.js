import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import numeral from 'numeral';
import React from 'react';
import PropTypes from 'prop-types';

const PaymentsList = ({ payments, positiveOnly }) => {
  let list = payments;
  let positiveMessage = 'todos';
  if (positiveOnly) {
    list = payments.filter((p) => p.total > 0);
    positiveMessage = 'sólo por pagar';
  }
  return (
    <>
      <Typography style={{ marginBottom: 16 }}>
        {`Mostrando ${list.length} dueños (${positiveMessage})`}
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Edificio</TableCell>
              <TableCell>Dueño</TableCell>
              <TableCell>Info dueño</TableCell>
              <TableCell>Puestos</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Done?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((element) => {
              const {
                owner, ownerInfo, places, building, total,
              } = element;
              const ownerKey = `${building.id}_${owner}`;
              return (
                <TableRow key={ownerKey}>
                  <TableCell>
                    <FontAwesomeIcon
                      icon={['far', 'money-check-edit-alt']}
                      style={{ marginRight: 8, color: total > 0 ? '#2E7D32' : '#B71C1C' }}
                    />
                    {building.name}
                  </TableCell>
                  <TableCell>{owner}</TableCell>
                  <TableCell>{ownerInfo}</TableCell>
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
    </>
  );
};

PaymentsList.propTypes = {
  payments: PropTypes.any,
  positiveOnly: PropTypes.bool,
};

PaymentsList.defaultProps = {
  payments: [],
  positiveOnly: true,
};

export default PaymentsList;
