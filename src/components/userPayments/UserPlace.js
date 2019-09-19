import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import monthsHelper from '../../constants/monthsHelper';
import shapes from '../../constants/shapes';

const UserPlace = ({
  assignments, building, uid, place,
}) => {
  if (Object.keys(assignments).length === 0) return null;

  const myPlace = get(building, `places.${place}`, {});
  const myAssignment = get(assignments, `assignments.people.${uid}`, undefined);

  if (!myAssignment) {
    return (
      <Paper style={{ padding: 16, width: 350, marginRight: 16 }}>
        <Typography variant="h6" style={{ marginBottom: 16 }}>Mi puesto</Typography>
        <Typography>
          {`No asignado en ${monthsHelper.getDisplayMonthWithYear(assignments.date)}` }
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: 16, width: 350, marginRight: 16 }}>
      <Typography variant="h6" style={{ marginBottom: 16 }}>Mi puesto</Typography>
      <Typography>{`Edificio ${building.name}`}</Typography>
      <Typography>{`Puesto ${myPlace.number}`}</Typography>
      <br />
      <Typography>{`Dirección del edificio: ${building.address}`}</Typography>
      <Typography>{`Dueño del puesto: ${myPlace.owner}`}</Typography>
      <Typography>{myPlace.otherInfo ? `Más información del puesto: ${myPlace.otherInfo}` : ''}</Typography>
    </Paper>
  );
};

UserPlace.propTypes = {
  assignments: PropTypes.shape({
    date: PropTypes.any,
  }),
  building: PropTypes.shape(shapes.building),
  uid: PropTypes.string,
  place: PropTypes.string,
};

UserPlace.defaultProps = {
  assignments: {},
  building: {},
  uid: '',
  place: '',
};

export default UserPlace;
