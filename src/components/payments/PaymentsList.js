import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Checkbox, Hidden, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography,
} from '@material-ui/core';
import moment from 'moment';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';
import UsersCards from '../users/UsersCards';
import UsersTable from '../users/UsersTable';
import PaymentsCards from './PaymentsCards';
import PaymentsTable from './PaymentsTable';

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
      <Hidden smDown>
        <PaymentsTable onPay={(event) => onPay(event)} list={list} />
      </Hidden>
      <Hidden mdUp>
        <PaymentsCards onPay={(event) => onPay(event)} list={list} />
      </Hidden>
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
