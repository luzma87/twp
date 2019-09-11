import React, { forwardRef } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';

const link = forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Link innerRef={ref} to={routes.PASSWORD_FORGET} {...props}>
    Olvidé mi password
  </Link>
));

const PasswordForgetLink = () => (
  <Button component={link}>
    Default
  </Button>
);

export default PasswordForgetLink;
