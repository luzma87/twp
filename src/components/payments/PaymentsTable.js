import {
  Checkbox, Paper, Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import moment from 'moment';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';
import ActiveIndicator from '../_common/ActiveIndicator';

const PaymentsTable = ({ list, onPay }) => (
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
            owner, ownerInfo, ownerPayment, places, building, total, payed, id,
          } = element;
          const placesCount = places.length;
          const ownerKey = `${building.id}_${owner}`;
          return (
            <TableRow key={ownerKey}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <ActiveIndicator isActive={total > 0} icon="money-check-edit-alt" />
                {building.name}
              </TableCell>
              <TableCell>{owner}</TableCell>
              <TableCell>{`${ownerInfo} - ${ownerPayment}`}</TableCell>
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
);

PaymentsTable.propTypes = {
  list: PropTypes.any,
  onPay: PropTypes.func.isRequired,
};

PaymentsTable.defaultProps = {
  list: [],
};

export default PaymentsTable;
