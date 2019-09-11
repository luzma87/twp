import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';

const CustomPaper = (props) => {
  const { children } = props;
  return (
    <Paper className="custom-paper">
      {children}
    </Paper>
  );
};

CustomPaper.propTypes = {
  children: PropTypes.any.isRequired,
};

export default CustomPaper;
