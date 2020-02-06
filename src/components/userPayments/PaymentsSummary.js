import { Typography } from '@material-ui/core';
import { get } from 'lodash';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

const PaymentsSummary = ({ assignments }) => {
  const valuePerPerson = get(assignments, 'assignments.valuePerPerson', 0);
  const people = get(assignments, 'assignments.people', {});
  const peopleList = Object.values(people);
  const peopleCount = peopleList.length;
  const peoplePayedList = peopleList.filter((p) => p.payed !== undefined);
  const peoplePayedCount = peoplePayedList.length;
  const totalAmount = peopleCount * parseFloat(valuePerPerson);
  const totalPayed = peoplePayedCount * parseFloat(valuePerPerson);

  return (
    <>
      <Typography>
        {`${peoplePayedCount === 1 ? 'Ha' : 'Han'} pagado ${peoplePayedCount} de ${peopleCount} personas`}
      </Typography>
      <Typography>
        {`Han pagado ${numeral(totalPayed).format('$0,0.00')} de ${numeral(totalAmount).format('$0,0.00')}`}
      </Typography>
      <Typography>
        {`Falta por pagar: ${numeral(totalAmount - totalPayed).format('$0,0.00')}}`}
      </Typography>
    </>
  );
};

PaymentsSummary.propTypes = {
  assignments: PropTypes.any,
};

PaymentsSummary.defaultProps = {
  assignments: {},
};

export default PaymentsSummary;
