import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import AssignmentCard from './AssignmentCard';

const AssignmentsCards = ({ list, textFilter, onDelete }) => (
  <Grid container spacing={2}>
    {list.map((assignment, index) => (
      <Grid key={assignment.user.uid} item xs={12} sm={6}>
        <AssignmentCard
          assignment={assignment}
          textFilter={textFilter}
          index={index + 1}
          onDelete={(uid, buildingId, placeId) => onDelete(uid, buildingId, placeId)}
        />
      </Grid>
    ))}
  </Grid>
);

AssignmentsCards.propTypes = {
  list: PropTypes.any,
  textFilter: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

AssignmentsCards.defaultProps = {
  list: [],
  textFilter: '',
};

export default AssignmentsCards;
