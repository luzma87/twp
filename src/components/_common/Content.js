import PropTypes from 'prop-types';
import React from 'react';
import CustomNavBar from "./CustomNavBar";

const Content = (props) => {
  const {children} = props;
  return (
    <div>
      <CustomNavBar />
      <div style={{padding: 24}}>
        {children}
      </div>
    </div>
  );
};

Content.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Content;
