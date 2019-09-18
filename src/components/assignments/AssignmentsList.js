import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';
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

const AssignmentsList = ({
  assignments, skill, buildingFilter, onDelete,
}) => {
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
            <TableCell>Eliminar</TableCell>
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
                  {place ? (
                    <>
                      {`${building.getPlaceString(placeId)}`}
                      <MeteorRating id="placeDifficulty" compact value={place.difficulty} />
                    </>
                  ) : null}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onDelete(user.uid, building.id, placeId)}>
                    <FontAwesomeIcon icon={['far', 'trash-alt']} />
                  </IconButton>
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
  onDelete: PropTypes.func.isRequired,
};

AssignmentsList.defaultProps = {
  assignments: [],
  buildingFilter: null,
  skill: false,
};

export default AssignmentsList;
