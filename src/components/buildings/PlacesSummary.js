import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React from 'react';
import shapes from '../../constants/shapes';
import PlaceForm from './PlaceForm';

const PlacesSummary = (props) => {
  const {
    placeValues, onPlaceChange, onAddPlace, onDeletePlace, allPlaces,
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
          key={place.number}
          style={{
            padding: 16, marginTop: 8, border: 'solid 1px #333', borderRadius: 5,
          }}
        >
          {`#${place.number}, ${place.difficulty}*, ${place.size.label}, ${place.owner}, $${place.price}`}
          <IconButton
            color="secondary"
            onClick={() => onDeletePlace(place.number)}
          >
            <FontAwesomeIcon icon={['far', 'trash-alt']} />
          </IconButton>
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
  allPlaces: PropTypes.shape({}).isRequired,
};

PlacesSummary.defaultProps = {
  placeValues: {},
};

export default PlacesSummary;
