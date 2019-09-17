import React from 'react';
import routes from '../../constants/routes';
import CustomButton from '../_common/CustomButton';

const SignInLink = () => (
  <CustomButton to={routes.SIGN_IN}>
    Entrar
  </CustomButton>
);

export default SignInLink;
