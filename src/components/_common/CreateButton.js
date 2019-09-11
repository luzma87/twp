import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const link = (to) => forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Link innerRef={ref} to={to} {...props} />
));

const CreateButton = ({ linkTo }) => (
  <Button component={link(linkTo)} style={{ marginBottom: 16 }}>
    <FontAwesomeIcon icon={['far', 'plus-hexagon']} style={{ marginRight: 8 }} />
      Crear
  </Button>
);

CreateButton.propTypes = {
  linkTo: PropTypes.any.isRequired,
};

CreateButton.defaultProps = {};

export default CreateButton;
