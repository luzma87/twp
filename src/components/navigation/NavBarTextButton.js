import { Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import customLink from './customLink';

const NavBarTextButton = ({ title, text, to }) => (
  <Tooltip title={title}>
    <Button color="inherit" component={customLink(to)}>
      {text}
    </Button>
  </Tooltip>
);

NavBarTextButton.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

NavBarTextButton.defaultProps = {};

export default NavBarTextButton;
