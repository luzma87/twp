import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Grid, Typography } from '@material-ui/core';
import { get } from 'lodash';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import monthsHelper from '../../constants/monthsHelper';
import routes from '../../constants/routes';
import Content from '../_common/Content';
import CustomLoader from '../_common/CustomLoader';
import MonthsSelect from '../_common/MonthsSelect';
import AssignmentsForEmailList from '../assignments/AssignmentsForEmailList';
import customLink from '../navigation/customLink';
import withAuthorization from '../session/withAuthorization';
import PaymentsSummary from './PaymentsSummary';

const getPaymentsId = (date) => `payment_${date.getMonth()}_${date.getFullYear()}`;
const getSelectedPaymentsId = (selectedMonth) => `payment_${selectedMonth}`;

const UsersPaymentsPage = ({ firebase }) => {
  const [assignments, setAssignments] = useState({});
  const [date] = useState(new Date());
  const [isLoading, setLoading] = useState(false);
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
      firebase.userPayments().off();
    };
  }, [firebase, date]);

  const onSelectMonth = (event) => {
    const { value } = event.target;
    setSelectedMonth(value);
    firebase.userPayment(getSelectedPaymentsId(value)).on('value', (snapshotUserPayments) => {
      const savedValues = snapshotUserPayments.val();
      setAssignments(savedValues);
      setLoading(false);
    });
  };

  const valuePerPerson = get(assignments, 'assignments.valuePerPerson', 0);
  const people = get(assignments, 'assignments.people', {});

  return (
    <Content>
      <Grid item xs={12}>
        <CustomLoader isLoading={isLoading} />
      </Grid>

      <Grid item xs={12}>
        <Button color="inherit" component={customLink(routes.SHAME_EMAIL)}>
          <FontAwesomeIcon icon={['far', 'envelope-open-dollar']} style={{ marginRight: 8 }} />
        Shame Email
        </Button>
      </Grid>

      <Grid item xs={12}>
        <MonthsSelect
          date={date}
          value={selectedMonth}
          onChange={(event) => onSelectMonth(event)}
        />
      </Grid>
      <Grid item xs={12}>
        {assignments ? (
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12}>
              <Typography>
                {`La cuota de ${monthsHelper.getDisplayMonthWithYear(assignments.date)} es de ${numeral(valuePerPerson).format('$0,0.00')}`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <PaymentsSummary assignments={assignments} />
            </Grid>
            <Grid item xs={12}>
              <AssignmentsForEmailList assignments={people} check />
            </Grid>
          </Grid>
        ) : null}
      </Grid>

    </Content>
  );
};

UsersPaymentsPage.propTypes = {
  firebase: PropTypes.any.isRequired,
};

export default compose(
  withAuthorization(conditions.isLoggedUser),
)(UsersPaymentsPage);
