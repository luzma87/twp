import { Button, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import routes from '../../constants/routes';
import Users from '../../domain/Users';
import ActiveIndicator from '../_common/ActiveIndicator';
import Content from '../_common/Content';
import CreateButton from '../_common/CreateButton';
import CustomLoader from '../_common/CustomLoader';
import CustomTextField from '../_common/CustomTextField';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';
import UsersList from './UsersList';

const UsersPage = ({ firebase }) => {
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [activeOnly, setActiveOnly] = useState(true);
  const [textFilter, setTextFilter] = useState('');

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

  const onTextFilterChange = (event) => {
    setTextFilter(event.target.value);
  };

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
            <ActiveIndicator isActive icon="user" themed />
              Mostrar solo activos
          </Button>
        </Grid>
        <Grid item>
          <Button style={{ marginBottom: 16 }} onClick={() => setActiveOnly(false)}>
            <ActiveIndicator isActive={false} icon="user" themed />
              Mostrar todos
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={5} md={3} lg={2}>
        <CustomTextField
          onChange={(event) => onTextFilterChange(event)}
          label="Filtrar"
          id="textFilter"
          value={textFilter}
        />
      </Grid>
      <Grid item xs={12}>
        <UsersList
          users={users}
          activeOnly={activeOnly}
          textFilter={textFilter}
        />
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
