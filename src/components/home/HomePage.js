import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import Content from '../_common/Content';
import AssignmentsList from '../assignments/AssignmentsList';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';

const HomePage = ({ firebase }) => {
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
      <AssignmentsList buildings={buildings} users={users} />
    </Content>
  );
};

HomePage.propTypes = {
  firebase: PropTypes.any.isRequired,
};

export default compose(
  withAuthorization(conditions.isLoggedUser),
  withFirebase,
)(HomePage);
