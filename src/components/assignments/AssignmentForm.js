import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
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
    <form
      style={{
        display: 'grid',
        gridTemplateColumns: '200px 200px 150px',
        gridColumnGap: 60,
      }}
      onSubmit={(event) => onSubmit(event)}
    >
      <CustomSelect
        id="user"
        value={assignmentValues.user}
        label="Persona"
        values={users}
        onChange={(event) => onChange(event)}
      />
      <CustomSelect
        id="place"
        value={assignmentValues.place}
        label="Puesto"
        values={places}
        onChange={(event) => onChange(event)}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ margin: '24px 0' }}
        disabled={isInvalid || isLoading}
        onClick={(event) => onSubmit(event)}
      >
        <FontAwesomeIcon icon={['far', icon]} style={{ marginRight: 16 }} />
            Guardar
      </Button>
    </form>
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
