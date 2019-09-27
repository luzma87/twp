import React from 'react';
import routes from '../../constants/routes';
import CustomButton from '../_common/CustomButton';

const SignInLink = () => (
  <CustomButton to={routes.SIGN_IN} data-cy="sign-in-button">
    Entrar
  </CustomButton>
);

export default SignInLink;
