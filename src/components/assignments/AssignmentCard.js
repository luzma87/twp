import {
  Button, Card, CardActions, CardContent,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import CardTitle from '../_common/CardTitle';
import MeteorRating from '../_common/meteorRating/MeteorRating';
import TextWithIcon from '../_common/TextWithIcon';

const AssignmentCard = ({ assignment, onDelete }) => {
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
  );
};

AssignmentCard.propTypes = {
  assignment: PropTypes.any,
  onDelete: PropTypes.func.isRequired,
};

AssignmentCard.defaultProps = {
  assignment: {},
};

export default AssignmentCard;
