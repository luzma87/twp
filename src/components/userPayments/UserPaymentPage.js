import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { get } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import shapes from '../../constants/shapes';
import Content from '../_common/Content';
import EmailContent from '../email/EmailContent';
import withAuthorization from '../session/withAuthorization';
import UserPayment from './UserPayment';

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

const getPaymentsId = (date, month) => `payment_${date.getMonth() - month}_${date.getFullYear()}`;

const UserPaymentPage = ({ authUser, firebase }) => {
  const [assignments, setAssignments] = useState({});
  const [prevAssignments, setPrevAssignments] = useState({});
  const [prevAssignments2, setPrevAssignments2] = useState({});
  const [date] = useState(new Date());
  const [isLoading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  useEffect(() => {
    setLoading(true);
    firebase.userPayment(getPaymentsId(date, 0)).on('value', (snapshotUserPayments) => {
      const savedValues = snapshotUserPayments.val();
      if (savedValues) {
        setAssignments(savedValues);
      }
      firebase.userPayment(getPaymentsId(date, 1)).on('value', (snapshotPrevUserPayments) => {
        const savedPrevValues = snapshotPrevUserPayments.val();
        if (savedPrevValues) {
          setPrevAssignments(savedPrevValues);
        }

        firebase.userPayment(getPaymentsId(date, 2)).on('value', (snapshotPrevUserPayments2) => {
          const savedPrevValues2 = snapshotPrevUserPayments2.val();
          if (savedPrevValues2) {
            setPrevAssignments2(savedPrevValues2);
          }
          setLoading(false);
        });
      });
    });

    return function cleanup() {
      firebase.buildings().off();
      firebase.params().off();
      firebase.users().off();
      firebase.userPayment().off();
    };
  }, [firebase, date, authUser]);

  const updatePayment = (value) => {
    setLoadingSave(true);

    const updates = {};
    updates[`userPayments/${getPaymentsId(date, 0)}/assignments/people/${authUser.uid}/payed`] = value;

    firebase.databaseRef()
      .update(updates)
      .then(() => {
        setLoadingSave(false);
      });
  };

  const onPay = (event) => {
    updatePayment(getPaymentDate(date));
    event.preventDefault();
  };

  const onUndo = (event) => {
    updatePayment(null);
    event.preventDefault();
  };

  const myAssignment = get(assignments, `assignments.people.${authUser.uid}`, undefined);
  const payed = get(myAssignment, 'payed', undefined);

  const accountInfo = get(assignments, 'params.accountInfo', undefined);

  const getPaymentElement = () => {
    if (myAssignment === undefined) return null;
    if (payed) {
      const icon = loadingSave ? 'spinner' : 'undo';
      return (
        <>
          <Typography style={{ marginTop: 24 }} color="textSecondary">
            {`Pagado el ${moment(payed).format('DD/MM/YYYY HH:mm')}`}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ margin: '24px 0' }}
            disabled={isLoading}
            onClick={(event) => onUndo(event)}
          >
            <FontAwesomeIcon icon={['far', icon]} pulse={isLoading} style={{ marginRight: 16 }} />
            Deshacer pago
          </Button>
        </>
      );
    }
    const icon = loadingSave ? 'spinner' : 'badge-dollar';
    return (
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ margin: '24px 0' }}
        disabled={isLoading}
        onClick={(event) => onPay(event)}
      >
        <FontAwesomeIcon icon={['far', icon]} pulse={isLoading} style={{ marginRight: 16 }} />
        Ya pagué
      </Button>
    );
  };

  if (!myAssignment) {
    return (
      <Content>
        <Typography variant="h5" style={{ marginBottom: 24 }}>
          Mis pagos
        </Typography>
        {`No asignado en ${getDisplayMonth(assignments.date)} `}
      </Content>
    );
  }

  return (
    <Content>
      <Typography variant="h5" style={{ marginBottom: 24 }}>
        Mis pagos
      </Typography>

      <UserPayment assignments={assignments} uid={authUser.uid} />
      {getPaymentElement()}

      <Typography style={{ marginTop: 24, marginBottom: 16 }}>
        Información de la cuenta:
      </Typography>
      <EmailContent text={accountInfo} />
      <div style={{ display: 'flex', marginTop: 32 }}>
        <UserPayment assignments={prevAssignments} uid={authUser.uid} past />
        <UserPayment assignments={prevAssignments2} uid={authUser.uid} past />
      </div>

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
