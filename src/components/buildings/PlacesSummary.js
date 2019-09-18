import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React from 'react';
import constants from '../../constants/constants';
import shapes from '../../constants/shapes';
import PlaceForm from './PlaceForm';

const PlacesSummary = (props) => {
  const {
    placeValues, onPlaceChange, onAddPlace, onDeletePlace, onEditPlace, allPlaces,
  } = props;
  return (
    <>
      <PlaceForm
        onAddPlace={onAddPlace}
        onPlaceChange={onPlaceChange}
        placeValues={placeValues}
      />

      {allPlaces ? Object.values(allPlaces).map((place) => (
        <Box
          bgcolor="text.hint"
          color="background.paper"
          key={place.id}
          style={{
            padding: 16, marginTop: 8, border: 'solid 1px #333', borderRadius: 5,
          }}
        >
          {`#${place.number}, ${place.difficulty}*, ${constants.carSizeLabel(place.size)}, ${place.owner}, $${place.price}`}
          <Tooltip title="Editar">
            <IconButton
              color="secondary"
              onClick={() => onEditPlace(place.id)}
            >
              <FontAwesomeIcon icon={['far', 'pencil-alt']} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton
              color="secondary"
              onClick={() => onDeletePlace(place.id)}
            >
              <FontAwesomeIcon icon={['far', 'trash-alt']} />
            </IconButton>
          </Tooltip>
        </Box>
      )) : null}
    </>
  );
};

PlacesSummary.propTypes = {
  placeValues: PropTypes.shape(shapes.place),
  onPlaceChange: PropTypes.func.isRequired,
  onAddPlace: PropTypes.func.isRequired,
  onDeletePlace: PropTypes.func.isRequired,
  onEditPlace: PropTypes.func.isRequired,
  allPlaces: PropTypes.shape({}).isRequired,
};

PlacesSummary.defaultProps = {
  placeValues: {},
};

export default PlacesSummary;
