import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import routes from '../../constants/routes';
import Content from '../_common/Content';
import CreateButton from '../_common/CreateButton';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';
import UsersList from './UsersList';

const UsersPage = ({ firebase }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Mostrando solo usuarios activos');

  useEffect(() => {
    setLoading(true);
    firebase.users().on('value', (snapshot) => {
      const usersObject = snapshot.val();

      if (usersObject) {
        const usersList = Object.values(usersObject);
        setUsers(usersList);
        const activeUsers = usersList.filter((u) => u.isActive);
        setFilteredUsers(activeUsers);
      }
      setLoading(false);
    });

    return function cleanup() {
      firebase.users().off();
    };
  }, [firebase]);

  const filterActive = (flag) => {
    let newUserList;
    if (flag) {
      newUserList = users.filter((u) => u.isActive);
    } else {
      newUserList = users;
      setMessage('Mostrando todos los usuarios');
    }
    setFilteredUsers(newUserList);
  };

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
      <div>
        <CreateButton linkTo={routes.USERS_CREATE} />
        <Button style={{ marginBottom: 16 }} onClick={() => filterActive(true)}>
          <FontAwesomeIcon icon={['far', 'user-astronaut']} style={{ marginRight: 8 }} color="#2E7D32" />
          Mostrar solo activos
        </Button>
        <Button style={{ marginBottom: 16 }} onClick={() => filterActive(false)}>
          <FontAwesomeIcon icon={['far', 'user-astronaut']} style={{ marginRight: 8 }} color="#B71C1C" />
          Mostrar todos
        </Button>
      </div>
      <Typography>
        {message}
      </Typography>
      <UsersList users={filteredUsers} />
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
