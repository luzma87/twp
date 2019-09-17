import { Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import CustomButton from '../_common/CustomButton';

const NavBarTextButton = ({ title, text, to }) => (
  <Tooltip title={title}>
    <CustomButton color="inherit" to={to}>
      {text}
    </CustomButton>
  </Tooltip>
);

NavBarTextButton.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

NavBarTextButton.defaultProps = {};

export default NavBarTextButton;
