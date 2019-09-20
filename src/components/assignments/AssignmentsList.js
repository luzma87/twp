import { Hidden } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Assignments from '../../domain/Assignments';
import AssignmentsCards from './AssignmentsCards';
import AssignmentsTable from './AssignmentsTable';

const AssignmentsList = ({
  assignments, buildingFilter, onDelete,
}) => {
  if (!(assignments instanceof Assignments)) {
    return null;
  }
  const list = assignments.sortedByUser(buildingFilter);
  return (
    <>
      <Hidden smDown>
        <AssignmentsTable
          list={list}
          onDelete={(uid, buildingId, placeId) => onDelete(uid, buildingId, placeId)}
        />
      </Hidden>
      <Hidden mdUp>
        <AssignmentsCards
          list={list}
          onDelete={(uid, buildingId, placeId) => onDelete(uid, buildingId, placeId)}
        />
      </Hidden>
    </>
  );
};

AssignmentsList.propTypes = {
  assignments: PropTypes.any,
  buildingFilter: PropTypes.any,
  onDelete: PropTypes.func.isRequired,
};

AssignmentsList.defaultProps = {
  assignments: [],
  buildingFilter: null,
};

export default AssignmentsList;
