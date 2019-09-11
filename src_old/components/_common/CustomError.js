import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const CustomError = ({ message }) => (
  message
    ? (
      <Box
        bgcolor="error.main"
        color="error.contrastText"
        style={{ padding: 8, borderRadius: 8, marginBottom: 16 }}
      >
        <Typography>
          {message}
        </Typography>
      </Box>
    )
    : null
);

CustomError.propTypes = {
  message: PropTypes.string,
};

CustomError.defaultProps = {
  message: undefined,
};

export default CustomError;
