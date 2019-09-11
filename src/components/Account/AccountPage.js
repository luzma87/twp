import React from 'react';
import PasswordChangeForm from '../PasswordChange/PasswordChangeForm';
import AuthUserContext from '../Session/context';
import withAuthorization from '../Session/withAuthorization';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <h1>
          Account:
          {authUser.email}
        </h1>
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
