import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Grid } from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import ActiveIndicator from '../_common/ActiveIndicator';
import Content from '../_common/Content';
import CustomError from '../_common/CustomError';
import CustomLoader from '../_common/CustomLoader';
import MonthsSelect from '../_common/MonthsSelect';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';
import PaymentsList from './PaymentsList';

const getPaymentDate = (date) => moment(date).format();
const getPaymentsId = (date) => `payment_${date.getMonth()}_${date.getFullYear()}`;
const getSelectedPaymentsId = (selectedMonth) => `payment_${selectedMonth}`;

const PaymentsPage = ({ firebase }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [positiveOnly, setPositiveOnly] = useState(true);
  const [payments, setPayments] = useState({});
  const [date] = useState(new Date());
  const [isLoading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState({});

  useEffect(() => {
    setLoading(true);
    firebase.ownerPayment(getPaymentsId(date, 0)).on('value', (snapshotUserPayments) => {
      const savedValues = snapshotUserPayments.val();
      if (savedValues) {
        setPayments(savedValues);
        const startingDate = savedValues.date;
        setSelectedMonth(`${startingDate.month}_${startingDate.year}`);
      }
      setLoading(false);
    });

    return function cleanup() {
      firebase.ownerPayments().off();
    };
  }, [firebase, date]);

  const onSelectMonth = (event) => {
    setLoading(true);
    const { value } = event.target;
    setSelectedMonth(value);
    firebase.ownerPayment(getSelectedPaymentsId(value)).on('value', (snapshotUserPayments) => {
      const savedValues = snapshotUserPayments.val();
      setPayments(savedValues);
      setLoading(false);
    });
  };

  const onToggle = (event) => {
    const { name } = event.target;
    const [owner, prop] = name.split('::');

    const newPayments = { ...payments };
    const paymentElement = newPayments.payments[owner][prop];
    if (!paymentElement || paymentElement === '') {
      newPayments.payments[owner][prop] = getPaymentDate(date);
    } else {
      newPayments.payments[owner][prop] = '';
    }
    setPayments(newPayments);
  };

  const onSave = (event) => {
    setLoadingSave(true);
    firebase
      .ownerPayment(getPaymentsId(date))
      .set(payments)
      .then(() => {
        setLoadingSave(false);
      })
      .catch((error) => {
        setErrorMessage(error);
        setLoadingSave(false);
      });
    event.preventDefault();
  };

  const icon = loadingSave ? 'spinner' : 'save';

  return (
    <Content>
      <Grid item xs={12}>
        <CustomLoader isLoading={isLoading} />
      </Grid>
      <Grid item xs={12} container spacing={2} alignItems="flex-end">
        <Grid item xs={4}>
          <MonthsSelect
            date={date}
            value={selectedMonth}
            onChange={(event) => onSelectMonth(event)}
          />
        </Grid>
        <Grid item xs={3}>
          <Button onClick={(event) => onSave(event)}>
            <FontAwesomeIcon icon={['far', icon]} style={{ marginRight: 8 }} />
            Guardar
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <CustomError error={errorMessage} />
      </Grid>
      <Grid item xs={12}>
        <Button style={{ marginBottom: 16 }} onClick={() => setPositiveOnly(true)}>
          <ActiveIndicator isActive icon="money-check-edit-alt" />
          Mostrar solo &gt;0
        </Button>
        <Button style={{ marginBottom: 16 }} onClick={() => setPositiveOnly(false)}>
          <ActiveIndicator isActive={false} icon="money-check-edit-alt" />
          Mostrar todos
        </Button>
      </Grid>
      <Grid item xs={12}>
        {payments
          ? (
            <PaymentsList
              payments={payments.payments}
              positiveOnly={positiveOnly}
              onToggle={(event) => onToggle(event)}
            />
          )
          : null}
      </Grid>
    </Content>
  );
};
PaymentsPage.propTypes = {
  firebase: PropTypes.any.isRequired,
};

export default compose(
  withAuthorization(conditions.isAdminUser),
  withFirebase,
)(PaymentsPage);
