import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import routes from '../../constants/routes';
import Users from '../../domain/Users';
import Content from '../_common/Content';
import CreateButton from '../_common/CreateButton';
import CustomLoader from '../_common/CustomLoader';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';
import UsersList from './UsersList';

const UsersPage = ({ firebase }) => {
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [activeOnly, setActiveOnly] = useState(true);

  useEffect(() => {
    setLoading(true);
    firebase.users().on('value', (snapshot) => {
      const usersObject = snapshot.val();
      setUsers(new Users(usersObject));
      setLoading(false);
    });

    return function cleanup() {
      firebase.users().off();
    };
  }, [firebase]);

  return (
    <Content>
      <Grid item xs={12}>
        <CustomLoader isLoading={isLoading} />
      </Grid>
      <Grid item container xs={12}>
        <Grid item>
          <CreateButton linkTo={routes.USERS_CREATE} />
        </Grid>
        <Grid item>
          <Button style={{ marginBottom: 16 }} onClick={() => setActiveOnly(true)}>
            <FontAwesomeIcon icon={['far', 'user-astronaut']} style={{ marginRight: 8 }} color="#2E7D32" />
              Mostrar solo activos
          </Button>
        </Grid>
        <Grid item>
          <Button style={{ marginBottom: 16 }} onClick={() => setActiveOnly(false)}>
            <FontAwesomeIcon icon={['far', 'user-astronaut']} style={{ marginRight: 8 }} color="#B71C1C" />
              Mostrar todos
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <UsersList users={users} activeOnly={activeOnly} />
      </Grid>
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
