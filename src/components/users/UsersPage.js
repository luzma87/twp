import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import Content from '../_common/Content';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';
import UsersList from './UsersList';

const UsersPage = ({ firebase }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    firebase.users().on('value', (snapshot) => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));
      setUsers(usersList);
      setLoading(false);
    });

    return function cleanup() {
      firebase.users().off();
    };
  }, [firebase]);

  return (
    <Content>
      {loading && (
        <Typography color="secondary">
          <FontAwesomeIcon
            icon={['far', 'spinner']}
            pulse
            size="4x"
          />
        </Typography>
      )}
      <UsersList users={users} />
    </Content>
  );
};

UsersPage.propTypes = {
  firebase: PropTypes.any.isRequired,
};

export default compose(
  withAuthorization(conditions.isAdminUser),
  withFirebase,
)(UsersPage);
