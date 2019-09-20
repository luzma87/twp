import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const Content = ({ children }) => (
  <div style={{ padding: 24 }}>
    <Grid container spacing={2}>
      {children}
    </Grid>
  </div>
);

Content.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Content;
