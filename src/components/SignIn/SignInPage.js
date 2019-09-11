import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import PasswordForgetLink from '../PasswordForget/PasswordForgetLink';
import SignInForm from './SignInForm';

const SignInPage = () => (
  <Paper
    style={{
      width: 400, margin: 'auto', marginTop: 40, padding: 24, textAlign: 'center',
    }}
  >
    <Typography gutterBottom color="textSecondary" variant="h4">
      TW Parking
    </Typography>
    <SignInForm />
    <div style={{ textAlign: 'right' }}>
      <PasswordForgetLink />
    </div>
  </Paper>
);

export default SignInPage;
