import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
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
  const [positiveOnly, setPositiveOnly] = useState(true);

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
      <PaymentsList payments={list} positiveOnly={positiveOnly}/>
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
