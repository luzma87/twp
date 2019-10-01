import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import CustomHighlighter from '../_common/CustomHighlighter';
import MeteorRating from '../_common/meteorRating/MeteorRating';

const AssignmentsTable = ({ list, textFilter, onDelete }) => (
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
                <CustomHighlighter filter={[textFilter]} text={user.name} />
                <MeteorRating id="userSkill" compact value={user.parkingMeteors} />
              </TableCell>
              <TableCell>
                {`${user.getCarString()}`}
              </TableCell>
              <TableCell>
                {place ? (
                  <>
                    <CustomHighlighter filter={[textFilter]} text={`${building.getPlaceString(placeId)}`} />
                    <MeteorRating id="placeDifficulty" compact value={place.difficulty} />
                    [
                    <MeteorRating id="userPlaceDifficulty" compact value={user.parkingDifficulty} />
                    ]
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
  textFilter: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

AssignmentsTable.defaultProps = {
  list: [],
  textFilter: '',
};

export default AssignmentsTable;
