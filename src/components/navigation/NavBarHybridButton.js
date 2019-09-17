import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import CustomButton from '../_common/CustomButton';

const NavBarHybridButton = ({ title, icon, to }) => (
  <CustomButton color="inherit" to={to}>
    <FontAwesomeIcon icon={['far', icon]} style={{ marginRight: 8 }} />
    {title}
  </CustomButton>
);

NavBarHybridButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};


export default NavBarHybridButton;
