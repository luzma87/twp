/* eslint-disable react/jsx-props-no-spreading,no-unused-vars */
import { Button } from '@material-ui/core';
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import customLink from '../navigation/customLink';

const CustomButton = forwardRef(({ to, children, ...rest }, ref) => (
  <Button component={customLink(to)} {...rest}>
    {children}
  </Button>
));

CustomButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

export default CustomButton;
