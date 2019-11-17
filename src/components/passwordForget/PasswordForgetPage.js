import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import SignInLink from '../signIn/SignInLink';
import PasswordForgetForm from './PasswordForgetForm';

const PasswordForgetPage = () => (
  <Paper
    style={{
      width: 400, margin: 'auto', marginTop: 40, padding: 24, textAlign: 'center',
    }}
  >
    <Typography gutterBottom color="textSecondary" variant="h4">
      Recuperar password
    </Typography>
    <PasswordForgetForm />
    <div style={{ textAlign: 'right' }}>
      <SignInLink />
    </div>
  </Paper>
);

export default PasswordForgetPage;
