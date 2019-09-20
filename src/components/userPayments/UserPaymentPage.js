import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button, Grid, Paper, Typography,
} from '@material-ui/core';
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
import PageTitle from '../_common/PageTitle';
import EmailContent from '../email/EmailContent';
import withAuthorization from '../session/withAuthorization';
import UserPayment from './UserPayment';
import UserPlace from './UserPlace';

const getPaymentDate = (date) => moment(date).format();

const getPaymentsId = (date, month) => `payment_${date.getMonth() - month}_${date.getFullYear()}`;

const getSelectedPaymentsId = (selectedMonth) => `payment_${selectedMonth}`;

const UserPaymentPage = ({ authUser, firebase }) => {
  const [assignments, setAssignments] = useState({});
  const [building, setBuilding] = useState({});
  const [date] = useState(new Date());
  const [isLoading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');

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

    if (authUser.place) {
      firebase.building(authUser.place.building).on('value', (snapshotBuilding) => {
        setBuilding(snapshotBuilding.val());
      });
    }

    return function cleanup() {
      firebase.userPayments().off();
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

  if (Object.keys(selectedMonth).length === 0) {
    setSelectedMonth(monthsHelper.getCurrentMonthForSelect());
  }

  const getIcon = () => {
    if (loadingSave) return 'spinner';
    if (payed) return 'undo';
    return 'badge-dollar';
  };

  const getLabel = () => (payed ? 'Deshacer pago' : 'Marcar como pagado');

  const getCallback = () => (payed ? onUndo : onPay);

  const getButton = () => (
    <Button
      variant="contained"
      color="primary"
      size="large"
      style={{ margin: '24px 0', width: '100%' }}
      disabled={isLoading}
      onClick={(event) => getCallback()(event)}
    >
      <FontAwesomeIcon icon={['far', getIcon()]} pulse={isLoading} style={{ marginRight: 16 }} />
      {getLabel()}
    </Button>
  );

  const monthsSelect = (
    <div style={{ marginBottom: 32 }}>
      <MonthsSelect
        date={date}
        value={selectedMonth}
        onChange={(event) => onSelectMonth(event)}
      />
    </div>
  );

  const assignmentExists = assignments !== undefined
    && assignments !== null
    && Object.keys(assignments).length > 0;

  let notAssignedMessage = 'No asignado';
  if (selectedMonth) {
    notAssignedMessage = `No asignado en ${monthsHelper.getDisplayMonthFromSelect(selectedMonth)}`;
  }
  if (assignmentExists) {
    notAssignedMessage = `No asignado en ${monthsHelper.getDisplayMonthWithYear(assignments.date)}`;
  }
  let content = (
    <Typography>
      {notAssignedMessage}
    </Typography>
  );

  if (myAssignment) {
    content = (
      <>
        <Grid item xs={12} sm={9} md={6} lg={5} xl={4}>
          <UserPayment assignments={assignments} uid={authUser.uid} />
        </Grid>
        <Grid item xs={12} sm={9} md={6} lg={5} xl={4}>
          <UserPlace
            assignments={assignments}
            building={building}
            user={authUser}
          />
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={12} sm={9} md={6} lg={5} xl={4}>
            {getButton()}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={9} md={6} lg={5} xl={4}>
          <Paper style={{ padding: 16 }}>
            <Typography style={{ marginBottom: 16 }}>
              Información de la cuenta para el depósito:
            </Typography>
            <EmailContent text={accountInfo} />
          </Paper>
        </Grid>
      </>
    );
  }

  return (
    <Content>
      <Grid container>
        <Grid item xs={12}>
          <PageTitle label="Mis pagos" />
        </Grid>

        <Grid item xs={12}>
          {monthsSelect}
        </Grid>

        <Grid container justify="flex-start" spacing={2} item xs={12} sm={12} md={11} lg={9} xl={8}>
          {content}
        </Grid>
      </Grid>
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
