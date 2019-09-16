import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import Assignments from '../../domain/Assignments';
import Content from '../_common/Content';
import CustomLoader from '../_common/CustomLoader';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';
import PaymentsList from './PaymentsList';

const PaymentsPage = ({ firebase }) => {
  const [loadingBuildings, setLoadingBuildings] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    setLoadingBuildings(true);
    setLoadingUsers(true);
    let buildingsObject;
    firebase.buildings().on('value', (snapshot) => {
      buildingsObject = snapshot.val();
      setLoadingBuildings(false);
    });
    firebase.users().on('value', (snapshot) => {
      const usersObject = snapshot.val();

      if (usersObject) {
        const usersList = Object.values(usersObject).filter((u) => u.isActive);
        setAssignments(new Assignments(usersList, buildingsObject));
      }
      setLoadingUsers(false);
    });

    return function cleanup() {
      firebase.buildings().off();
      firebase.users().off();
    };
  }, [firebase]);

  let list = [];
  if (assignments instanceof Assignments) {
    list = assignments.getListForPayments();
  }
  return (
    <Content>
      <CustomLoader isLoading={loadingBuildings || loadingUsers} />
      <PaymentsList payments={list} />
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
