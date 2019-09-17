/* eslint-disable react/jsx-props-no-spreading */
import Button from '@material-ui/core/Button';
import React from 'react';
import PropTypes from 'prop-types';
import customLink from '../navigation/customLink';

const CustomButton = ({ to, children, ...rest }) => (
  <Button component={customLink(to)} {...rest}>
    {children}
  </Button>
);

CustomButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

export default CustomButton;
