import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import PasswordForgetLink from '../passwordForget/PasswordForgetLink';
import SignInForm from './SignInForm';

const SignInPage = () => (
  <Grid container justify="center">
    <Grid item xs={10} sm={9} md={8} lg={7} xl={6}>
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
