import { Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import PasswordForgetLink from '../passwordForget/PasswordForgetLink';
import SignInForm from './SignInForm';

const SignInPage = () => (
  <Grid container justify="center">
    <Grid item xs={10} sm={9} md={6} lg={6} xl={6}>
      <Paper
        style={{
          marginTop: 40, padding: 24, textAlign: 'center',
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
    </Grid>
  </Grid>
);

export default SignInPage;
