import { Hidden } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { union } from 'lodash';
import Assignments from '../../domain/Assignments';
import AssignmentsCards from './AssignmentsCards';
import AssignmentsTable from './AssignmentsTable';

const AssignmentsList = ({
  assignments, buildingFilter, textFilter, onDelete,
}) => {
  if (!(assignments instanceof Assignments)) {
    return null;
  }
  let list = assignments.sortedByUser(buildingFilter);
  if (textFilter.length > 0) {
    const searchString = textFilter.toLowerCase();
    const filteredByPerson = list.filter((a) => a.user.name.toLowerCase().includes(searchString));
    const filteredByPlace = list.filter((a) => {
      const place = a.building.places[a.placeId];
      return a.building.name.toLowerCase().includes(searchString)
        || place.owner.toLowerCase().includes(searchString);
    });
    list = union(filteredByPerson, filteredByPlace);
  }
  return (
    <>
      <Hidden smDown>
        <AssignmentsTable
          list={list}
          textFilter={textFilter}
          onDelete={(uid, buildingId, placeId) => onDelete(uid, buildingId, placeId)}
        />
      </Hidden>
      <Hidden mdUp>
        <AssignmentsCards
          list={list}
          textFilter={textFilter}
          onDelete={(uid, buildingId, placeId) => onDelete(uid, buildingId, placeId)}
        />
      </Hidden>
    </>
  );
};

AssignmentsList.propTypes = {
  assignments: PropTypes.any,
  buildingFilter: PropTypes.any,
  textFilter: PropTypes.any,
  onDelete: PropTypes.func.isRequired,
};

AssignmentsList.defaultProps = {
  assignments: [],
  buildingFilter: null,
  textFilter: '',
};

export default AssignmentsList;
