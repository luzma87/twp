import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { get } from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import shapes from '../../constants/shapes';
import Content from '../_common/Content';
import withAuthorization from '../session/withAuthorization';

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

const getPaymentDate = (date) => moment(date).format();

const getPaymentsId = (date) => `payment_${date.getMonth()}_${date.getFullYear()}`;

const UserPaymentPage = ({ authUser, firebase }) => {
  const [assignments, setAssignments] = useState({});
  const [myAssignment, setMyAssignment] = useState({});
  const [date] = useState(new Date());
  const [isLoading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  useEffect(() => {
    setLoading(true);
    firebase.userPayment(getPaymentsId(date)).on('value', (snapshotUserPayments) => {
      const savedValues = snapshotUserPayments.val();
      if (savedValues) {
        setAssignments(savedValues);
        setMyAssignment(savedValues.assignments.people[authUser.uid]);
      }
      setLoading(false);
    });

    return function cleanup() {
      firebase.buildings().off();
      firebase.params().off();
      firebase.users().off();
    };
  }, [firebase, date]);

  const onSubmit = (event) => {
    setLoadingSave(true);

    const newAssignments = { ...assignments };
    newAssignments.assignments.people[authUser.uid].payed = getPaymentDate(date);
    firebase
      .userPayment(getPaymentsId(date))
      .set(newAssignments)
      .then(() => {
        setLoadingSave(false);
      })
      .catch((e) => {
        console.log('error', e);
      });
    event.preventDefault();
  };

  const icon = loadingSave ? 'spinner' : 'badge-dollar';

  const valuePerPerson = get(assignments, 'assignments.valuePerPerson', 0);
  const payed = get(assignments, `assignments.people.${authUser.uid}.payed`, undefined);


  const getPaymentElement = () => {
    if (myAssignment === undefined) return null;
    if (payed) {
      return (
        <Typography style={{ marginTop: 24 }} color="textSecondary">
          {`Pagado el ${moment(payed).format('DD/MM/YYYY HH:mm')}`}
        </Typography>
      );
    }
    return (
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ margin: '24px 0' }}
        disabled={isLoading}
        onClick={(event) => onSubmit(event)}
      >
        <FontAwesomeIcon icon={['far', icon]} pulse={isLoading} style={{ marginRight: 16 }} />
        Pagar
      </Button>
    );
  };

  console.log(assignments);

  return (
    <Content>
      <Typography variant="h5" style={{ marginBottom: 24 }}>
        Mis pagos
      </Typography>
      <Typography>
        {`La cuota de ${getDisplayMonth(assignments.date)} es de ${numeral(valuePerPerson).format('$0,0.00')}`}
      </Typography>
      <Typography>
        {myAssignment ? `Mi puesto: ${myAssignment.place}` : 'No asignado este mes'}
      </Typography>
      {getPaymentElement()}

    </Content>
  );
};

UserPaymentPage.propTypes = {
  authUser: PropTypes.shape(shapes.user).isRequired,
  firebase: PropTypes.any.isRequired,
};

export default compose(
  withAuthorization(conditions.isLoggedUser),
)(UserPaymentPage);
