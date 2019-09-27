import { Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import SignInLink from '../signIn/SignInLink';
import PasswordForgetForm from './PasswordForgetForm';

const PasswordForgetPage = () => (
  <Grid container justify="center">
    <Grid item xs={10} sm={9} md={8} lg={7} xl={6}>
      <Paper
        style={{
          marginTop: 40, padding: 24, textAlign: 'center',
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
    </Grid>
  </Grid>
);

export default PasswordForgetPage;
