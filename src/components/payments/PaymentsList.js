import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import numeral from 'numeral';
import React from 'react';
import PropTypes from 'prop-types';

const PaymentsList = ({ payments, positiveOnly, onPay }) => {
  let list = Object.values(payments);
  let positiveMessage = 'todos';
  if (positiveOnly) {
    list = list.filter((p) => p.total > 0);
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
              <TableCell />
              <TableCell>Edificio</TableCell>
              <TableCell>Dueño</TableCell>
              <TableCell>Info dueño</TableCell>
              <TableCell>Puestos</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Pagado?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((element, index) => {
              const {
                owner, ownerInfo, places, building, total, payed, id,
              } = element;
              const placesCount = places.length;
              const ownerKey = `${building.id}_${owner}`;
              return (
                <TableRow key={ownerKey}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <FontAwesomeIcon
                      icon={['far', 'money-check-edit-alt']}
                      style={{ marginRight: 8, color: total > 0 ? '#2E7D32' : '#B71C1C' }}
                    />
                    {building.name}
                  </TableCell>
                  <TableCell>{owner}</TableCell>
                  <TableCell>{ownerInfo}</TableCell>
                  <TableCell align="right">
                    {places.map((place) => (
                      <div key={`${ownerKey}_${place.id}`} style={{ display: 'flex' }}>
                        <div>
                          {place.number}
                        </div>
                        <div style={{ marginLeft: 16 }}>
                          {numeral(place.price).format('$0,0.00')}
                        </div>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="right" style={{ width: 70 }}>
                    <div style={{ marginBottom: 8 }}>
                      {`${placesCount} puesto${placesCount === 1 ? '' : 's'}`}
                    </div>
                    {numeral(total).format('$0,0.00')}
                  </TableCell>
                  <TableCell align="center" style={{ width: 75 }}>
                    <div style={{ width: 20 }}>
                      {payed !== '' ? moment(payed).format('DD/MM/YYYY') : <span>&nbsp;</span>}
                    </div>
                    <Checkbox
                      name={id}
                      checked={payed !== ''}
                      onChange={(event) => onPay(event)}
                      color="primary"
                      inputProps={{
                        'aria-label': 'secondary checkbox',
                      }}
                    />
                  </TableCell>
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
  onPay: PropTypes.func.isRequired,
  positiveOnly: PropTypes.bool,
};

PaymentsList.defaultProps = {
  payments: {},
  positiveOnly: true,
};

export default PaymentsList;
