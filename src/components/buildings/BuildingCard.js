import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card, CardActions, CardContent, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import routes from '../../constants/routes';
import CardTitle from '../_common/CardTitle';
import CustomButton from '../_common/CustomButton';
import MeteorRating from '../_common/meteorRating/MeteorRating';
import TextWithIcon from '../_common/TextWithIcon';

const getIconColor = (active) => (active ? '#2E7D32' : '#B71C1C');

const BuildingCard = ({ building, index }) => {
  const moreInfo = building.observations
    ? <TextWithIcon text={building.observations} icon="info-square" />
    : null;
  const places = Object.values(building.places);
  return (
    <Card>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <CardTitle
            label={`${index}. ${building.name}`}
            icon="warehouse"
          />
        </div>
        <TextWithIcon text={building.address} icon="map-marked-alt" />
        {moreInfo}
        <Typography style={{ marginTop: 16 }}><strong>Puestos</strong></Typography>
        <ul className="fa-ul">
          {places.map((place) => (
            <li key={place.id}>
              <FontAwesomeIcon
                icon={['far', 'draw-square']}
                listItem
                color={getIconColor(place.isActive)}
              />
              {`${building.getPlaceInfo(place)}, `}
              <MeteorRating id="placeDifficulty" value={place.difficulty} compact />
            </li>
          ))}
        </ul>
      </CardContent>
      <CardActions>
        <CustomButton to={`${routes.BUILDINGS_EDIT_ID}${building.uid}`} size="small">
          Editar
        </CustomButton>
      </CardActions>
    </Card>
  );
};

BuildingCard.propTypes = {
  building: PropTypes.any,
  index: PropTypes.number,
};

BuildingCard.defaultProps = {
  building: {},
  index: 0,
};

export default BuildingCard;
