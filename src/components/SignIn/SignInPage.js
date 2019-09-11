import React from 'react';
import PasswordForgetLink from '../PasswordForget/PasswordForgetLink';
import SignInForm from './SignInForm';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <PasswordForgetLink />
  </div>
);

export default SignInPage;
