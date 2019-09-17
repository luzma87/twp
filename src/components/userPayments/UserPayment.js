import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { get } from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import React from 'react';
import PropTypes from 'prop-types';

const getDisplayMonth = (date) => {
  if (date === undefined) return '';
  const monthNames = [
    'Enero', 'Febrero', 'Marzo',
    'Abril', 'Mayo', 'Junio', 'Julio',
    'Agosto', 'Septiembre', 'Octubre',
    'Noviembre', 'Diciembre',
  ];
  const monthIndex = date.month;
  return `${monthNames[monthIndex]} ${date.year}`;
};

const UserPayment = ({ assignments, uid, past }) => {
  const valuePerPerson = get(assignments, 'assignments.valuePerPerson', 0);
  const myAssignment = get(assignments, `assignments.people.${uid}`, undefined);
  const payed = get(myAssignment, 'payed', undefined);

  if (Object.keys(assignments).length === 0) return null;

  return (
    <Paper style={{ padding: 16, width: 350, marginRight: 16 }}>
      <Typography>
        {`La cuota de ${getDisplayMonth(assignments.date)} ${past ? 'era' : 'es'} de ${numeral(valuePerPerson).format('$0,0.00')}`}
      </Typography>
      <Typography>
        {myAssignment
          ? `Mi puesto: ${myAssignment.place}`
          : `No asignado en ${getDisplayMonth(assignments.date)} `}
      </Typography>
      <Typography>
        {payed ? `Pagado el ${moment(payed).format('DD/MM/YYYY HH:mm')}` : 'No pagado'}
      </Typography>
    </Paper>
  );
};

UserPayment.propTypes = {
  assignments: PropTypes.shape({}),
  uid: PropTypes.string,
  past: PropTypes.bool,
};

UserPayment.defaultProps = {
  assignments: {},
  uid: '',
  past: false,
};

export default UserPayment;
