import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import Content from '../_common/Content';
import CustomLoader from '../_common/CustomLoader';
import MonthsSelect from '../_common/MonthsSelect';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';
import PaymentsList from './PaymentsList';

const getPaymentsId = (date) => `payment_${date.getMonth()}_${date.getFullYear()}`;
const getSelectedPaymentsId = (selectedMonth) => `payment_${selectedMonth}`;

const PaymentsPage = ({ firebase }) => {
  const [positiveOnly, setPositiveOnly] = useState(true);
  const [payments, setPayments] = useState({});
  const [date] = useState(new Date());
  const [isLoading, setLoading] = useState(false);
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

  return (
    <Content>
      <CustomLoader isLoading={isLoading} />
      <div style={{ marginBottom: 32 }}>
        <MonthsSelect
          date={date}
          value={selectedMonth}
          onChange={(event) => onSelectMonth(event)}
        />
      </div>
      <div>
        <Button style={{ marginBottom: 16 }} onClick={() => setPositiveOnly(true)}>
          <FontAwesomeIcon icon={['far', 'money-check-edit-alt']} style={{ marginRight: 8 }} color="#2E7D32" />
          Mostrar solo &gt;0
        </Button>
        <Button style={{ marginBottom: 16 }} onClick={() => setPositiveOnly(false)}>
          <FontAwesomeIcon icon={['far', 'money-check-edit-alt']} style={{ marginRight: 8 }} color="#B71C1C" />
          Mostrar todos
        </Button>
      </div>
      {payments
        ? (<PaymentsList payments={payments.payments} positiveOnly={positiveOnly} />)
        : null}
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
