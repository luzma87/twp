/* eslint-disable react/no-array-index-key */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import monthsHelper from '../../constants/monthsHelper';
import Assignments from '../../domain/Assignments';
import Content from '../_common/Content';
import CustomError from '../_common/CustomError';
import CustomLoader from '../_common/CustomLoader';
import MonthsSelect from '../_common/MonthsSelect';
import AssignmentsForEmailList from '../assignments/AssignmentsForEmailList';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';
import AssignmentEmailContent from './AssignmentEmailContent';

const getCurrentPaymentsId = (date) => `payment_${date.getMonth()}_${date.getFullYear()}`;

const getPaymentsId = (dateToSave) => `payment_${dateToSave.month}_${dateToSave.year}`;

const AssignmentEmailPage = ({ firebase }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSavedForMonth, setSavedForMonth] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingBuildings, setLoadingBuildings] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingParams, setLoadingParams] = useState(false);
  const [loadingUserPayments, setLoadingUserPayments] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [params, setParams] = useState({});
  const [date] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(monthsHelper.getCurrentMonthForSelect());

  useEffect(() => {
    setLoadingBuildings(true);
    setLoadingUsers(true);
    setLoadingParams(true);
    setLoadingUserPayments(true);
    firebase.userPayment(getCurrentPaymentsId(date)).on('value', (snapshotUserPayments) => {
      const savedValues = snapshotUserPayments.val();
      setLoadingUserPayments(false);

      if (savedValues) {
        setLoadingBuildings(false);
        setLoadingUsers(false);
        setLoadingParams(false);
        setLoadingUserPayments(false);
        setSavedForMonth(true);
        setParams(savedValues.params);
        setAssignments(savedValues.assignments);
      } else {
        firebase.users().on('value', (snapshotUsers) => {
          const usersObject = snapshotUsers.val();
          setLoadingUsers(false);
          let asg;
          firebase.buildings().on('value', (snapshotBuildings) => {
            const buildingsObject = snapshotBuildings.val();
            const usersList = Object.values(usersObject).filter((u) => u.isActive);
            asg = new Assignments(usersList, buildingsObject);
            setLoadingBuildings(false);

            firebase.params().on('value', (snapshotParams) => {
              const paramsObject = snapshotParams.val();
              setParams(paramsObject);
              const a = asg.getListForEmail(paramsObject);
              const b = asg.getListForPayments();
              setPayments(b);
              setAssignments(a);
              setLoadingParams(false);
            });
          });
        });
      }
    });

    return function cleanup() {
      firebase.buildings().off();
      firebase.params().off();
      firebase.users().off();
      firebase.userPayments().off();
    };
  }, [firebase, date]);

  const saveAssignments = () => {
    const dateToSave = monthsHelper.getDateObjectFromSelect(selectedMonth);
    const userPayments = {
      params,
      assignments,
      date: dateToSave,
    };
    const ownerPayments = {
      payments,
      date: dateToSave,
    };

    const paymentsId = getPaymentsId(dateToSave);
    firebase
      .userPayment(paymentsId)
      .set(userPayments)
      .then(() => {
        setLoadingSave(false);
      })
      .catch((error) => {
        setErrorMessage(error);
        setLoadingSave(false);
      });

    firebase
      .ownerPayment(paymentsId)
      .set(ownerPayments)
      .then(() => {
        setLoadingSave(false);
      })
      .catch((error) => {
        setErrorMessage(error);
        setLoadingSave(false);
      });
  };

  const onSave = (event) => {
    setLoadingSave(true);
    saveAssignments();
    event.preventDefault();
  };

  const isLoading = loadingBuildings || loadingUsers || loadingParams || loadingUserPayments;
  const icon = loadingSave ? 'spinner' : 'save';

  const getNewMonthElement = () => {
    const month = monthsHelper.getDisplayMonthFromSelect(selectedMonth);
    return isSavedForMonth
      ? (
        <Typography color="textSecondary">
          {`Ya está guardado para ${month}`}
        </Typography>
      )
      : (
        <Button onClick={(event) => onSave(event)}>
          <FontAwesomeIcon icon={['far', icon]} style={{ marginRight: 8 }} />
          {`Guardar para registrar pagos (${month})`}
        </Button>
      );
  };

  const onSelectMonth = (event) => {
    const { value } = event.target;
    setSelectedMonth(value);
    const dateLookup = `payment_${value}`;

    setLoadingBuildings(true);
    setLoadingUsers(true);
    setLoadingParams(true);
    setLoadingUserPayments(true);

    firebase.userPayment(dateLookup).on('value', (snapshotUserPayments) => {
      const savedValues = snapshotUserPayments.val();
      setLoadingUserPayments(false);
      if (savedValues) {
        setLoadingBuildings(false);
        setLoadingUsers(false);
        setLoadingParams(false);
        setLoadingUserPayments(false);
        setSavedForMonth(true);
        setParams(savedValues.params);
        setAssignments(savedValues.assignments);
      } else {
        setSavedForMonth(false);
        firebase.users().on('value', (snapshotUsers) => {
          const usersObject = snapshotUsers.val();
          setLoadingUsers(false);
          let asg;
          firebase.buildings().on('value', (snapshotBuildings) => {
            const buildingsObject = snapshotBuildings.val();
            const usersList = Object.values(usersObject).filter((u) => u.isActive);
            asg = new Assignments(usersList, buildingsObject);
            setLoadingBuildings(false);

            firebase.params().on('value', (snapshotParams) => {
              const paramsObject = snapshotParams.val();
              setParams(paramsObject);
              const a = asg.getListForEmail(paramsObject);
              const b = asg.getListForPayments();
              setPayments(b);
              setAssignments(a);
              setLoadingParams(false);
            });
          });
        });
      }
    });
  };

  const currentMonthElement = getNewMonthElement();

  return (
    <Content>
      <Grid item xs={12}>
        {currentMonthElement}
      </Grid>
      <Grid item xs={12} container spacing={2} style={{ marginBottom: 16 }}>
        <Grid item xs={4}>
          <MonthsSelect
            date={date}
            value={selectedMonth}
            onChange={(event) => onSelectMonth(event)}
          />
        </Grid>
      </Grid>
      <Grid item sx={12}>
        <CustomError error={errorMessage} />
      </Grid>
      <Grid item sx={12}>
        <CustomLoader isLoading={isLoading} />
      </Grid>
      <Grid item sx={12}>
        {isLoading ? null : (
          <>
            <AssignmentEmailContent
              params={params}
              valuePerPerson={assignments.valuePerPerson}
              month={monthsHelper.getDisplayMonthFromSelect(selectedMonth)}
            />
            <AssignmentsForEmailList assignments={assignments.people} />
          </>
        )}
      </Grid>
    </Content>
  );
};

AssignmentEmailPage.propTypes = {
  firebase: PropTypes.any.isRequired,
};

export default compose(
  withAuthorization(conditions.isAdminUser),
  withFirebase,
)(AssignmentEmailPage);
