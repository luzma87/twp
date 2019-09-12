import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import routes from '../../constants/routes';
import Content from '../_common/Content';
import CreateButton from '../_common/CreateButton';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';
import AssignmentsList from './AssignmentsList';

const AssignmentsPage = ({ firebase }) => {
  const [buildings, setBuildings] = useState({});
  const [users, setUsers] = useState([]);
  const [loadingBuildings, setLoadingBuildings] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    setLoadingBuildings(true);
    setLoadingUsers(true);
    firebase.buildings().on('value', (snapshot) => {
      const buildingsObject = snapshot.val();
      if (buildingsObject) {
        setBuildings(buildingsObject);
      }
      setLoadingBuildings(false);
    });
    firebase.users().on('value', (snapshot) => {
      const usersObject = snapshot.val();

      if (usersObject) {
        const usersList = Object.values(usersObject).filter((u) => u.isActive);
        setUsers(usersList);
      }
      setLoadingUsers(false);
    });

    return function cleanup() {
      firebase.buildings().off();
      firebase.users().off();
    };
  }, [firebase]);

  return (
    <Content>
      {(loadingBuildings || loadingUsers) && (
        <Typography color="secondary">
          <FontAwesomeIcon
            icon={['far', 'spinner']}
            pulse
            size="4x"
          />
        </Typography>
      )}
      <CreateButton linkTo={routes.ASSIGNMENTS_CREATE} />
      <AssignmentsList buildings={buildings} users={users} skill />
    </Content>
  );
};

AssignmentsPage.propTypes = {
  firebase: PropTypes.any.isRequired,
};

export default compose(
  withAuthorization(conditions.isAdminUser),
  withFirebase,
)(AssignmentsPage);
