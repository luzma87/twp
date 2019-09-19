import { Paper, Typography } from '@material-ui/core';
import { get } from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';
import monthsHelper from '../../constants/monthsHelper';

const UserPayment = ({ assignments, uid, past }) => {
  if (Object.keys(assignments).length === 0) return null;

  const valuePerPerson = get(assignments, 'assignments.valuePerPerson', 0);
  const myAssignment = get(assignments, `assignments.people.${uid}`, undefined);
  const payed = get(myAssignment, 'payed', undefined);

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" style={{ marginBottom: 16 }}>Cuota</Typography>
      <Typography>
        {`La cuota de ${monthsHelper.getDisplayMonthWithYear(assignments.date)} ${past ? 'era' : 'es'} de ${numeral(valuePerPerson).format('$0,0.00')}`}
      </Typography>
      <Typography color={payed ? 'primary' : 'error'}>
        <strong>
          {payed ? `Pagado el ${moment(payed).format('DD/MM/YYYY HH:mm')}` : 'No pagado'}
        </strong>
      </Typography>
    </Paper>
  );
};

UserPayment.propTypes = {
  assignments: PropTypes.shape({
    date: PropTypes.any,
  }),
  uid: PropTypes.string,
  past: PropTypes.bool,
};

UserPayment.defaultProps = {
  assignments: {},
  uid: '',
  past: false,
};

export default UserPayment;
