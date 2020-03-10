import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import PaymentCard from './PaymentCard';

const PaymentsCards = ({ list, onToggle }) => (
  <Grid container spacing={2}>
    {list.map((payment, index) => {
      const { owner, building } = payment;
      const ownerKey = `${building.id}_${owner}`;
      return (
        <Grid key={ownerKey} item>
          <PaymentCard
            payment={payment}
            index={index + 1}
            onToggle={onToggle}
          />
        </Grid>
      );
    })}
  </Grid>
);

PaymentsCards.propTypes = {
  list: PropTypes.any,
  onToggle: PropTypes.func.isRequired,
};

PaymentsCards.defaultProps = {
  list: [],
};

export default PaymentsCards;
