import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import PaymentCard from './PaymentCard';

const PaymentsCards = ({ list, onPay }) => (
  <Grid container spacing={2}>
    {list.map((payment) => {
      const { owner, building } = payment;
      const ownerKey = `${building.id}_${owner}`;
      return (
        <Grid key={ownerKey} item xs={12} sm={6}>
          <PaymentCard payment={payment} onPay={(event) => onPay(event)} />
        </Grid>
      );
    })}
  </Grid>
);

PaymentsCards.propTypes = {
  list: PropTypes.any,
  onPay: PropTypes.func.isRequired,
};

PaymentsCards.defaultProps = {
  list: [],
};

export default PaymentsCards;
