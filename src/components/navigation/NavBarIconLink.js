import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';


const link = (to) => forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Link innerRef={ref} to={to} {...props} />
));

const NavBarIconLink = ({ title, icon, to }) => (
  <Tooltip title={title}>
    <IconButton component={link(to)}>
      <FontAwesomeIcon icon={['far', icon]} style={{ color: 'white' }} />
    </IconButton>
  </Tooltip>
);

NavBarIconLink.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

NavBarIconLink.defaultProps = {};

export default NavBarIconLink;
