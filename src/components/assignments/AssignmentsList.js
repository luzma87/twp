import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import React from 'react';
import Assignments from '../../domain/Assignments';
import MeteorRating from '../_common/meteorRating/MeteorRating';

const AssignmentsList = ({ assignments, skill, buildingFilter }) => {
  if (!(assignments instanceof Assignments)) {
    return null;
  }
  const list = assignments.sortedByUser(buildingFilter);
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Persona</TableCell>
            <TableCell>Auto</TableCell>
            <TableCell>Puesto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((assignment) => {
            const { user, building, placeId } = assignment;
            const place = building.places[placeId];
            return (
              <TableRow key={user.uid}>
                <TableCell>
                  {user.name}
                  {skill ? (
                    <MeteorRating id="userSkill" compact value={user.parkingMeteors} />
                  ) : ''}
                </TableCell>
                <TableCell>
                  {`${user.getCarString()}`}
                </TableCell>
                <TableCell>
                  {`${building.getPlaceString(placeId)}`}
                  <MeteorRating id="placeDifficulty" compact value={place.difficulty} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

AssignmentsList.propTypes = {
  assignments: PropTypes.any,
  buildingFilter: PropTypes.any,
  skill: PropTypes.bool,
};

AssignmentsList.defaultProps = {
  assignments: [],
  buildingFilter: null,
  skill: false,
};

export default AssignmentsList;
