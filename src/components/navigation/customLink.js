import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const customLink = (to) => forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Link innerRef={ref} to={to} {...props} />
));

export default customLink;
