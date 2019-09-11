import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const CreateButton = ({ linkTo }) => (
  <Link to={linkTo} style={{ textDecoration: 'none' }}>
    <Button style={{ marginBottom: 16 }}>
      <FontAwesomeIcon icon={['far', 'plus-hexagon']} style={{ marginRight: 8 }} />
        Crear
    </Button>
  </Link>
);

CreateButton.propTypes = {
  linkTo: PropTypes.any.isRequired,
};

CreateButton.defaultProps = {};

export default CreateButton;
