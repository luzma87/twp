import PropTypes from 'prop-types';
import React from 'react';

const CustomForm = ({ children }) => (
  <form
    style={{
      display: 'grid',
      gridTemplateColumns: '300px 300px',
      gridColumnGap: 72,
    }}
  >
    {children}
  </form>
);

CustomForm.propTypes = {
  children: PropTypes.any.isRequired,
};

export default CustomForm;
