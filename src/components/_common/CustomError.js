import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const CustomError = ({ error }) => (
  error
    ? (
      <Box
        bgcolor="error.main"
        color="error.contrastText"
        style={{
          padding: 8, borderRadius: 8, marginTop: 16, marginBottom: 16,
        }}
      >
        <Typography>
          {error.message}
        </Typography>
      </Box>
    )
    : null
);

CustomError.propTypes = {
  error: PropTypes.shape({ message: PropTypes.string }),
};

CustomError.defaultProps = {
  error: null,
};

export default CustomError;
