import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const NotFound = () => (
  <Paper className="custom-paper">
    <Typography variant="h1" color="primary">404</Typography>
    <Typography variant="h2" color="secondary">Not Found!</Typography>
    <FontAwesomeIcon
      icon={['far', 'ghost']}
      size="6x"
      style={{ margin: 24 }}
      color="#aabbcc"
    />
  </Paper>
);

export default NotFound;
