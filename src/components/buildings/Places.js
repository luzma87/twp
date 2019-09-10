import Paper from '@material-ui/core/Paper';
import React from 'react';
import PropTypes from 'prop-types';
import PlaceForm from './PlaceForm';

const Places = (props) => {
  const {
    placeTitle, placeValues, onPlaceChange, onAddPlace, allPlaces,
  } = props;
  return (
    <div>
      <Paper style={{ padding: 32 }}>
        <PlaceForm
          placeTitle={placeTitle}
          placeValues={placeValues}
          onPlaceChange={onPlaceChange}
          onAddPlace={onAddPlace}
        />
      </Paper>
      {Object.values(allPlaces).map((place) => (
        <Paper style={{ padding: 16, marginTop: 8 }}>
          {`#${place.number}, ${place.size.label}, ${place.owner}, $${place.price}`}
        </Paper>
      ))}
    </div>
  );
};

Places.propTypes = {
  placeTitle: PropTypes.string.isRequired,
  placeValues: PropTypes.object.isRequired,
  onPlaceChange: PropTypes.func.isRequired,
  onAddPlace: PropTypes.func.isRequired,
  allPlaces: PropTypes.shape({}).isRequired,
};

Places.defaultProps = {};

export default Places;
