import { Paper, Typography, Grid } from '@material-ui/core';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import monthsHelper from '../../constants/monthsHelper';
import shapes from '../../constants/shapes';
import MeteorRating from '../_common/meteorRating/MeteorRating';
import UserPayment from './UserPayment';

const UserPlace = ({
  assignments, building, user,
}) => {
  if (Object.keys(assignments).length === 0) return null;

  const place = get(user, 'place.place', null);
  const myPlace = get(building, `places.${place}`, {});
  const myAssignment = get(assignments, `assignments.people.${user.uid}`, null);

  if (!myAssignment || !place) {
    return (
      <Paper style={{ padding: 16 }}>
        <Typography variant="h6" style={{ marginBottom: 16 }}>Mi puesto</Typography>
        <Typography>
          {`No asignado en ${monthsHelper.getDisplayMonthWithYear(assignments.date)}` }
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: 16 }}>
      <Grid
        container
        alignContent="space-around"
        justify="space-around"
        alignItems="space-around"
      >
        <Grid item>
          <Typography variant="h4" style={{ marginBottom: 16 }}>
            Donde parqueo?
          </Typography>
          <Typography>{`Edificio ${building.name}, en la ${building.address}`}</Typography>
          <Typography>
            {`Puesto ${myPlace.number} [de ${myPlace.owner}]`}
            <MeteorRating id="puesto" value={myPlace.difficulty} compact />
          </Typography>
          <Typography>
            {myPlace.otherInfo ? `(${myPlace.otherInfo})` : ''}
          </Typography>
        </Grid>
        <Grid item>
          <UserPayment assignments={assignments} uid={user.uid} />
        </Grid>
      </Grid>
    </Paper>
  );
};

UserPlace.propTypes = {
  assignments: PropTypes.any,
  user: PropTypes.any,
  building: PropTypes.shape(shapes.building),
  uid: PropTypes.string,
};

UserPlace.defaultProps = {
  assignments: {},
  building: {},
  user: {},
  uid: '',
};

export default UserPlace;
