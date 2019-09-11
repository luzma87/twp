import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import PropTypes from 'prop-types';
import PlaceForm from './PlaceForm';

const Places = (props) => {
  const {
    placeTitle, placeValues, onPlaceChange, onAddPlace, onDeletePlace, allPlaces,
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
        <Paper key={place.number} style={{ padding: 16, marginTop: 8 }}>
          {`#${place.number}, ${place.difficulty}*, ${place.size.label}, ${place.owner}, $${place.price}`}
          <IconButton
            color="secondary"
            onClick={() => onDeletePlace(place.number)}
          >
            <FontAwesomeIcon icon={['far', 'trash-alt']} />
          </IconButton>
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
  onDeletePlace: PropTypes.func.isRequired,
  allPlaces: PropTypes.shape({}).isRequired,
};

Places.defaultProps = {};

export default Places;
