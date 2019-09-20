import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const TextWithIcon = ({ text, icon }) => (
  <Typography variant="body2" component="p">
    <FontAwesomeIcon icon={['far', icon]} fixedWidth style={{ marginRight: 8 }} />
    {text}
  </Typography>
);

TextWithIcon.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
};

TextWithIcon.defaultProps = {
  text: '',
  icon: 'alicorn',
};

export default TextWithIcon;
