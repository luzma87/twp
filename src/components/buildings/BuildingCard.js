import {
  Card, CardActions, CardContent, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import routes from '../../constants/routes';
import ActiveIndicator from '../_common/ActiveIndicator';
import CardTitle from '../_common/CardTitle';
import CustomButton from '../_common/CustomButton';
import MeteorRating from '../_common/meteorRating/MeteorRating';
import TextWithIcon from '../_common/TextWithIcon';

const BuildingCard = ({ building, index }) => {
  const moreInfo = building.observations
    ? <TextWithIcon text={building.observations} icon="place" themed />
    : null;
  const places = Object.values(building.places);
  return (
    <Card>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <CardTitle
            label={`${index}. ${building.name}`}
            icon="building"
            themed
            isActive={building.isActive}
          />
        </div>
        <TextWithIcon text={building.address} icon="map-marked-alt" />
        {moreInfo}
        <Typography style={{ marginTop: 16 }}><strong>Puestos</strong></Typography>
        <ul className="fa-ul">
          {places.map((place) => (
            <li key={place.id}>
              <ActiveIndicator icon="place" themed isActive={place.isActive} listItem />
              {`${building.getPlaceInfo(place)}, `}
              <MeteorRating id="placeDifficulty" value={place.difficulty} compact />
            </li>
          ))}
        </ul>
      </CardContent>
      <CardActions>
        <CustomButton to={`${routes.BUILDINGS_EDIT_ID}${building.id}`} size="small">
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
