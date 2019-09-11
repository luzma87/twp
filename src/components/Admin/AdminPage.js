import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import roles from '../../constants/roles';
import withFirebase from '../Firebase/withFirebase';
import withAuthorization from '../Session/withAuthorization';
import UserList from './UserList';

const AdminPage = ({ firebase }) => {
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
    <div>
      <h1>Admin</h1>
      <p>
        The Admin Page is accessible by every signed in admin user.
      </p>

      {loading && <div>Loading ...</div>}

      <UserList users={users} />
    </div>
  );
};

AdminPage.propTypes = {
  firebase: PropTypes.any.isRequired,
};


const condition = (authUser) => authUser && !!authUser.roles[roles.ADMIN];

export default compose(
  withAuthorization(condition),
  withFirebase,
)(AdminPage);
