import PropTypes from 'prop-types';
import React from 'react';

const Content = (props) => {
  const { children } = props;
  return (
    <div style={{ padding: 24 }}>
      {children}
    </div>
  );
};

Content.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Content;
