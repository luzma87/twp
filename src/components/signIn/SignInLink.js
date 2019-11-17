import Button from '@material-ui/core/Button';
import React from 'react';
import routes from '../../constants/routes';
import customLink from '../navigation/customLink';

const SignInLink = () => (
  <Button component={customLink(routes.SIGN_IN)}>
    Entrar
  </Button>
);

export default SignInLink;
