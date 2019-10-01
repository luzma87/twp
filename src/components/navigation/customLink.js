/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const customLink = (to) => forwardRef((props, ref) => (
  <Link innerRef={ref} to={to} {...props} />
));

export default customLink;
