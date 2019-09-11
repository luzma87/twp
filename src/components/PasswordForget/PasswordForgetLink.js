import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';

const PasswordForgetLink = () => (
  <p>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetLink;
