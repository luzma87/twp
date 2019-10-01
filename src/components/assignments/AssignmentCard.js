import {
  Button, Card, CardActions, CardContent,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import CardTitle from '../_common/CardTitle';
import MeteorRating from '../_common/meteorRating/MeteorRating';
import TextWithIcon from '../_common/TextWithIcon';

const AssignmentCard = ({
  assignment, textFilter, index, onDelete,
}) => {
  const { user, building, placeId } = assignment;
  const place = building.places[placeId];
  const placeElement = place
    ? (
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <TextWithIcon text={building.getPlaceString(placeId)} icon="place" themed textFilter={textFilter} />
        <MeteorRating id="placeDifficulty" compact value={place.difficulty} />
      </div>
    )
    : null;
  return (
    <Card>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <CardTitle
            textFilter={textFilter}
            label={`${index}. ${user.name}`}
            icon="user"
            themed
          />
          <MeteorRating id={user.uid} value={user.parkingMeteors} compact />
        </div>
        <TextWithIcon text={user.getCarString()} icon="car" themed />
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
  index: PropTypes.number,
  textFilter: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

AssignmentCard.defaultProps = {
  assignment: {},
  index: 0,
  textFilter: '',
};

export default AssignmentCard;
