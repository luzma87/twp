import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const PageTitle = ({ label }) => (
  <Typography variant="h4" style={{ marginBottom: 16 }}>
    {label}
  </Typography>
);

PageTitle.propTypes = {
  label: PropTypes.string.isRequired,
};

PageTitle.defaultProps = {};

export default PageTitle;
