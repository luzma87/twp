import { Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

const PageTitle = ({ label, icon }) => (
  <>
    <div className="title-icon">
      <FontAwesomeIcon icon={['far', icon]} style={{ marginLeft: 2 }} />
    </div>
    <Typography variant="h4" className="title-text">
      {label}
    </Typography>
  </>
);

PageTitle.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

PageTitle.defaultProps = {
  icon: '',
};

export default PageTitle;
