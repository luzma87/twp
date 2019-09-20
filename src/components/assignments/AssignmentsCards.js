import {
  Button, Card, CardActions, CardContent, Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import CardTitle from '../_common/CardTitle';
import MeteorRating from '../_common/meteorRating/MeteorRating';
import TextWithIcon from '../_common/TextWithIcon';

const AssignmentsCards = ({ list, onDelete }) => (
  <Grid container spacing={2}>
    {list.map((assignment) => {
      const { user, building, placeId } = assignment;
      const place = building.places[placeId];
      const placeElement = place
        ? (
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <TextWithIcon text={building.getPlaceString(placeId)} icon="draw-square" />
            <MeteorRating id="placeDifficulty" compact value={place.difficulty} />
          </div>
        )
        : null;
      return (
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <CardTitle
                  label={user.name}
                  icon="user-astronaut"
                />
                <MeteorRating id={user.uid} value={user.parkingMeteors} compact />
              </div>
              <TextWithIcon text={user.getCarString()} icon="rocket" />
              {placeElement}
            </CardContent>
            <CardActions>
              <Button onClick={() => onDelete(user.uid, building.id, placeId)} size="small">
                Eliminar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      );
    })}
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
