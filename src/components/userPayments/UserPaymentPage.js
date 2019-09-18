import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { get } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import monthsHelper from '../../constants/monthsHelper';
import shapes from '../../constants/shapes';
import Content from '../_common/Content';
import MonthsSelect from '../_common/MonthsSelect';
import EmailContent from '../email/EmailContent';
import withAuthorization from '../session/withAuthorization';
import UserPayment from './UserPayment';

const getPaymentDate = (date) => moment(date).format();

const getPaymentsId = (date, month) => `payment_${date.getMonth() - month}_${date.getFullYear()}`;

const getSelectedPaymentsId = (selectedMonth) => `payment_${selectedMonth}`;

const UserPaymentPage = ({ authUser, firebase }) => {
  const [assignments, setAssignments] = useState({});
  const [date] = useState(new Date());
  const [isLoading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState({});

  useEffect(() => {
    setLoading(true);
    firebase.userPayment(getPaymentsId(date, 0)).on('value', (snapshotUserPayments) => {
      const savedValues = snapshotUserPayments.val();
      if (savedValues) {
        setAssignments(savedValues);
        const startingDate = savedValues.date;
        setSelectedMonth(`${startingDate.month}_${startingDate.year}`);
      }
      setLoading(false);
    });

    return function cleanup() {
      firebase.userPayment().off();
    };
  }, [firebase, date, authUser]);

  const updatePayment = (value) => {
    setLoadingSave(true);

    const updates = {};
    updates[`userPayments/${getSelectedPaymentsId(selectedMonth)}/assignments/people/${authUser.uid}/payed`] = value;

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

  const onSelectMonth = (event) => {
    const { value } = event.target;
    setSelectedMonth(value);
    firebase.userPayment(getSelectedPaymentsId(value)).on('value', (snapshotUserPayments) => {
      const savedValues = snapshotUserPayments.val();
      setAssignments(savedValues);
      setLoading(false);
    });
  };

  const myAssignment = get(assignments, `assignments.people.${authUser.uid}`, undefined);
  const payed = get(myAssignment, 'payed', undefined);

  const accountInfo = get(assignments, 'params.accountInfo', undefined);

  const getPaymentElement = () => {
    if (myAssignment === undefined) return null;
    if (payed) {
      const icon = loadingSave ? 'spinner' : 'undo';
      return (
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
        Marcar como pagado
      </Button>
    );
  };
  const monthsSelect = (
    <div style={{ marginBottom: 32 }}>
      <MonthsSelect
        date={date}
        value={selectedMonth}
        onChange={(event) => onSelectMonth(event)}
      />
    </div>
  );

  if (!myAssignment) {
    return (
      <Content>
        <Typography variant="h5" style={{ marginBottom: 24 }}>
          Mis pagos
        </Typography>
        {monthsSelect}
        <Typography>
          {assignments
            ? `No asignado en ${monthsHelper.getDisplayMonthWithYear(assignments.date)} `
            : `No asignado en ${monthsHelper.getDisplayMonthFromSelect(selectedMonth)}`}
        </Typography>
      </Content>
    );
  }

  return (
    <Content>
      <Typography variant="h5" style={{ marginBottom: 24 }}>
        Mis pagos
      </Typography>

      {monthsSelect}
      <UserPayment assignments={assignments} uid={authUser.uid} />
      {getPaymentElement()}

      <Paper style={{ padding: 16, width: 350 }}>
        <Typography style={{ marginBottom: 16 }}>
        Información de la cuenta para el depósito:
        </Typography>
        <EmailContent text={accountInfo} />
      </Paper>
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
