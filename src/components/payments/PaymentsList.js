import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import PaymentsCards from './PaymentsCards';

const sortPayments = (a, b) => {
  if (a.ownerPayment < b.ownerPayment) {
    return -1;
  }
  if (a.ownerPayment > b.ownerPayment) {
    return 1;
  }
  return 0;
};

const PaymentsList = ({ payments, positiveOnly, onPay }) => {
  let list = Object.values(payments);
  let positiveMessage = 'todos';
  if (positiveOnly) {
    list = list.filter((p) => p.total > 0);
    positiveMessage = 'sólo por pagar';
  }
  list = list.sort(sortPayments);
  return (
    <>
      <Typography style={{ marginBottom: 16 }}>
        {`Mostrando ${list.length} dueños (${positiveMessage})`}
      </Typography>
      <PaymentsCards onPay={(event) => onPay(event)} list={list} />
      {/* <Hidden smDown> */}
      {/*  <PaymentsTable onPay={(event) => onPay(event)} list={list} /> */}
      {/* </Hidden> */}
      {/* <Hidden mdUp> */}
      {/*  <PaymentsCards onPay={(event) => onPay(event)} list={list} /> */}
      {/* </Hidden> */}
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
