import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Button, Grid, Paper, Typography,
} from '@material-ui/core';
import { withTheme } from '@material-ui/styles';
import Hidden from '@material-ui/core/Hidden';
import { get } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import monthsHelper from '../../constants/monthsHelper';
import routes from '../../constants/routes';
import shapes from '../../constants/shapes';
import Content from '../_common/Content';
import CustomButton from '../_common/CustomButton';
import MonthsSelect from '../_common/MonthsSelect';
import PageTitle from '../_common/PageTitle';
import EmailContent from '../email/EmailContent';
import withAuthorization from '../session/withAuthorization';
import UserPayment from './UserPayment';
import UserPlace from './UserPlace';

const getPaymentDate = (date) => moment(date).format();

const getPaymentsId = (date, month) => `payment_${date.getMonth() - month}_${date.getFullYear()}`;

const getSelectedPaymentsId = (selectedMonth) => `payment_${selectedMonth}`;

const UserPaymentPage = ({ authUser, firebase, theme }) => {
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

  const getLabel = () => (payed ? 'Deshacer' : 'Registrar pago');

  const getCallback = () => (payed ? onUndo : onPay);

  const getButton = () => (
    <Button
      variant="contained"
      color="primary"
      size="large"
      style={{
        width: '100%',
        height: 'calc(100% - 0px)',
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
      }}
      disabled={isLoading}
      onClick={(event) => getCallback()(event)}
    >
      <FontAwesomeIcon
        icon={['far', getIcon()]}
        pulse={isLoading}
        style={{ marginRight: 16 }}
      />
      {getLabel()}
    </Button>
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
      <Grid container>
        <Grid item xs={12} md={9}>
          <Paper style={{ padding: 16 }}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" style={{ marginBottom: 16 }}>
                    Dónde pago?
                </Typography>
                <EmailContent text={accountInfo} />
              </Grid>
              <Hidden mdUp>
                <div style={{
                  width: '100%',
                  height: 2,
                  background: theme.palette.grey[500],
                  margin: '16px 0',
                }}
                />
              </Hidden>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" style={{ marginBottom: 16 }}>
                    Cuánto pago?
                </Typography>
                <UserPayment assignments={assignments} uid={authUser.uid} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} style={{ alignSelf: 'stretch' }}>
          {getButton()}
        </Grid>
        <Grid
          item
          xs={12}
          style={{ alignSelf: 'stretch' }}
          className="singleColumn"
        >
          <UserPlace
            assignments={assignments}
            building={building}
            user={authUser}
          />
        </Grid>
      </Grid>
    );
  }

  const passChangeWarn = authUser.lastPassChange === undefined
    ? (
      <Box
        bgcolor="secondary.main"
        color="secondary.contrastText"
        style={{ padding: 8, borderRadius: 8, marginTop: 16 }}
      >
        <Typography>
          Si aún no lo has hecho, por favor cambia tu password yendo a
          <CustomButton to={routes.ACCOUNT} style={{ marginLeft: 8 }}>
            Mi cuenta
          </CustomButton>
        </Typography>
      </Box>
    )
    : null;

  return (
    <Content>
      {passChangeWarn}
      <Grid item xs={12}>
        <Grid item className="title">
          <PageTitle label="Mis pagos" icon="hand-holding-usd" />
        </Grid>
        <Grid item xs={4} className="singleColumn">
          <MonthsSelect
            date={date}
            value={selectedMonth}
            onChange={(event) => onSelectMonth(event)}
          />
        </Grid>
        {content}
      </Grid>
    </Content>
  );
};

UserPaymentPage.propTypes = {
  authUser: PropTypes.shape(shapes.user).isRequired,
  firebase: PropTypes.any.isRequired,
  theme: PropTypes.any.isRequired,
};

export default compose(
  withAuthorization(conditions.isLoggedUser),
  withTheme
)(UserPaymentPage);
