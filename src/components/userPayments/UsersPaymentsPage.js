import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { get } from 'lodash';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import routes from '../../constants/routes';
import Content from '../_common/Content';
import CustomLoader from '../_common/CustomLoader';
import AssignmentsForEmailList from '../assignments/AssignmentsForEmailList';
import customLink from '../navigation/customLink';
import withAuthorization from '../session/withAuthorization';

const getPaymentsId = (date) => `payment_${date.getMonth()}_${date.getFullYear()}`;

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

const UsersPaymentsPage = ({ firebase }) => {
  const [assignments, setAssignments] = useState({});
  const [date] = useState(new Date());
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    firebase.userPayment(getPaymentsId(date, 0)).on('value', (snapshotUserPayments) => {
      const savedValues = snapshotUserPayments.val();
      if (savedValues) {
        setAssignments(savedValues);
      }
      setLoading(false);
    });

    return function cleanup() {
      firebase.buildings().off();
      firebase.params().off();
      firebase.users().off();
      firebase.userPayment().off();
    };
  }, [firebase, date]);

  const valuePerPerson = get(assignments, 'assignments.valuePerPerson', 0);
  const people = get(assignments, 'assignments.people', 0);

  return (
    <Content>
      <CustomLoader isLoading={isLoading} />

      <Button color="inherit" component={customLink(routes.SHAME_EMAIL)}>
        <FontAwesomeIcon icon={['far', 'envelope-open-dollar']} style={{ marginRight: 8 }} />
        Shame Email
      </Button>

      <Typography>
        {`La cuota de ${getDisplayMonth(assignments.date)} es de ${numeral(valuePerPerson).format('$0,0.00')}`}
      </Typography>
      <AssignmentsForEmailList assignments={people} check />
    </Content>
  );
};

UsersPaymentsPage.propTypes = {
  firebase: PropTypes.any.isRequired,
};

export default compose(
  withAuthorization(conditions.isLoggedUser),
)(UsersPaymentsPage);