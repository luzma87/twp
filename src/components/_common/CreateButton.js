import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import CustomButton from './CustomButton';

const CreateButton = ({ linkTo }) => (
  <CustomButton to={linkTo} style={{ marginBottom: 16 }}>
    <FontAwesomeIcon icon={['far', 'plus-hexagon']} style={{ marginRight: 8 }} />
      Crear
  </CustomButton>
);

CreateButton.propTypes = {
  linkTo: PropTypes.any.isRequired,
};

CreateButton.defaultProps = {};

export default CreateButton;
