import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import monthsHelper from '../../constants/monthsHelper';
import Content from '../_common/Content';
import CustomLoader from '../_common/CustomLoader';
import AssignmentsForEmailList from '../assignments/AssignmentsForEmailList';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';
import PaymentsSummary from '../userPayments/PaymentsSummary';
import ShameEmailContent from './ShameEmailContent';

const getPaymentsId = (date) => `payment_${date.getMonth()}_${date.getFullYear()}`;

const ShameEmailPage = ({ firebase }) => {
  const [loadingUserPayments, setLoadingUserPayments] = useState(false);
  const [assignments, setAssignments] = useState({});
  const [params, setParams] = useState({});
  const [date] = useState(new Date());

  useEffect(() => {
    setLoadingUserPayments(true);
    firebase.userPayment(getPaymentsId(date)).on('value', (snapshotUserPayments) => {
      const savedValues = snapshotUserPayments.val();
      setLoadingUserPayments(false);

      if (savedValues) {
        setLoadingUserPayments(false);
        setParams(savedValues.params);
        setAssignments(savedValues.assignments);
      }
    });

    return function cleanup() {
      firebase.buildings().off();
      firebase.params().off();
      firebase.users().off();
      firebase.userPayment().off();
    };
  }, [firebase, date]);

  return (
    <Content>
      <CustomLoader isLoading={loadingUserPayments} />
      <ShameEmailContent
        params={params}
        valuePerPerson={assignments.valuePerPerson}
        month={monthsHelper.getMonthFromDate(date)}
      />
      <PaymentsSummary assignments={{ assignments }} />
      <AssignmentsForEmailList assignments={assignments.people} shame />
    </Content>
  );
};

ShameEmailPage.propTypes = {
  firebase: PropTypes.any.isRequired,
};

export default compose(
  withAuthorization(conditions.isAdminUser),
  withFirebase,
)(ShameEmailPage);
