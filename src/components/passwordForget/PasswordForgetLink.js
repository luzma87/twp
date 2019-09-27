import React from 'react';
import routes from '../../constants/routes';
import CustomButton from '../_common/CustomButton';

const PasswordForgetLink = () => (
  <CustomButton to={routes.PASSWORD_FORGET} data-cy="forgot-pass-button">
    Olvidé mi password
  </CustomButton>
);

export default PasswordForgetLink;
