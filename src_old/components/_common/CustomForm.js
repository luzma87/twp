import React from 'react';
import PropTypes from 'prop-types';

const CustomForm = props => (
  <form
    style={{
      display: 'grid',
      gridTemplateColumns: '300px 300px',
      gridColumnGap: 72,
    }}
  >
    {props.children}
  </form>
);

CustomForm.propTypes = {
  children: PropTypes.any.isRequired,
};

export default CustomForm;
