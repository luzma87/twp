import { Typography } from '@material-ui/core';
import React from 'react';
import conditions from '../../constants/conditions';
import Content from '../_common/Content';
import PasswordChangeForm from '../passwordChange/PasswordChangeForm';
import AuthUserContext from '../session/context';
import withAuthorization from '../session/withAuthorization';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <Content>
        <Typography variant="h4">
          Mi cuenta
        </Typography>
        <br />

        <Typography>{`Email: ${authUser.email}`}</Typography>
        <Typography>{`Nombre: ${authUser.username}`}</Typography>
        <br />

        <Typography variant="h5">Cambiar Password</Typography>
        <PasswordChangeForm />
      </Content>
    )}
  </AuthUserContext.Consumer>
);

export default withAuthorization(conditions.isLoggedUser)(AccountPage);
