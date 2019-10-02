import { Typography } from '@material-ui/core';
import { get } from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

const UserPayment = ({ assignments, uid }) => {
  if (Object.keys(assignments).length === 0) return null;

  const valuePerPerson = get(assignments, 'assignments.valuePerPerson', 0);
  const myAssignment = get(assignments, `assignments.people.${uid}`, undefined);
  const payed = get(myAssignment, 'payed', undefined);

  return (
    <>
      <Typography style={{ fontSize: '40px' }}>
        {numeral(valuePerPerson).format('$0,0.00')}
      </Typography>
      <Typography color={payed ? 'primary' : 'error'}>
        <strong>
          {payed ? `Pagado: ${moment(payed).format('DD/MM/YYYY')}` : 'No pagado'}
        </strong>
      </Typography>
    </>
  );
};

UserPayment.propTypes = {
  assignments: PropTypes.shape({
    date: PropTypes.any,
  }),
  uid: PropTypes.string,
};

UserPayment.defaultProps = {
  assignments: {},
  uid: '',
};

export default UserPayment;
