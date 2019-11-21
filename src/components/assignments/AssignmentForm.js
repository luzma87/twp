import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { isEmpty } from 'lodash';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import CustomSelect from '../_common/CustomSelect';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';

const AssignmentForm = ({
  places, users, onSubmit, assignmentValues, onChange, isLoading,
}) => {
  const isInvalid = Object.keys(assignmentValues.place).length === 0
    || Object.keys(assignmentValues.user).length === 0;

  const icon = isLoading ? 'spinner' : 'save';

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={5} md={4}>
        <CustomSelect
          id="user"
          value={isEmpty(assignmentValues.user) ? '' : assignmentValues.user}
          label="Persona"
          values={users}
          onChange={(event) => onChange(event)}
        />
      </Grid>
      <Grid item xs={6} sm={5} md={4}>
        <CustomSelect
          id="place"
          value={isEmpty(assignmentValues.place) ? '' : assignmentValues.place}
          label="Puesto"
          values={places}
          onChange={(event) => onChange(event)}
        />
      </Grid>
      <Grid item xs={6} sm={5} md={3}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{ width: '100%' }}
          disabled={isInvalid || isLoading}
          onClick={(event) => onSubmit(event)}
        >
          <FontAwesomeIcon icon={['far', icon]} style={{ marginRight: 16 }} />
            Guardar
        </Button>
      </Grid>
    </Grid>
  );
};

AssignmentForm.propTypes = {
  users: PropTypes.any,
  places: PropTypes.any,
  assignmentValues: PropTypes.any,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

AssignmentForm.defaultProps = {
  users: {},
  places: {},
  assignmentValues: {},
  isLoading: false,
};

export default compose(
  withAuthorization(conditions.isAdminUser),
  withFirebase,
)(AssignmentForm);
