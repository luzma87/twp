import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import MeteorRating from '../_common/meteorRating/MeteorRating';

const AssignmentsTable = ({ list, onDelete }) => (
  <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Persona</TableCell>
          <TableCell>Auto</TableCell>
          <TableCell>Puesto</TableCell>
          <TableCell>Eliminar</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {list.map((assignment, index) => {
          const { user, building, placeId } = assignment;
          const place = building.places[placeId];
          return (
            <TableRow key={user.uid}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {user.name}
                <MeteorRating id="userSkill" compact value={user.parkingMeteors} />
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

AssignmentsTable.propTypes = {
  list: PropTypes.any,
  onDelete: PropTypes.func.isRequired,
};

AssignmentsTable.defaultProps = {
  list: [],
};

export default AssignmentsTable;
