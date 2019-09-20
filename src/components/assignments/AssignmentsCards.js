import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import AssignmentCard from './AssignmentCard';

const AssignmentsCards = ({ list, onDelete }) => (
  <Grid container spacing={2}>
    {list.map((assignment) => (
      <Grid item xs={12} sm={6}>
        <AssignmentCard
          assignment={assignment}
          onDelete={(uid, buildingId, placeId) => onDelete(uid, buildingId, placeId)}
        />
      </Grid>
    ))}
  </Grid>
);

AssignmentsCards.propTypes = {
  list: PropTypes.any,
  onDelete: PropTypes.func.isRequired,
};

AssignmentsCards.defaultProps = {
  list: [],
};

export default AssignmentsCards;
