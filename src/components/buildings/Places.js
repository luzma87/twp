import Paper from '@material-ui/core/Paper';
import React from 'react';
import PropTypes from 'prop-types';
import PlaceForm from './PlaceForm';

const Places = (props) => {
  const {
    placeTitle, placeValues, handlePlaceChange,
  } = props;
  return (
    <div>
      <Paper style={{ padding: 32 }}>
        <PlaceForm
          placeTitle={placeTitle}
          placeValues={placeValues}
          handlePlaceChange={handlePlaceChange}
        />
      </Paper>
    </div>
  );
};

Places.propTypes = {
  placeTitle: PropTypes.string.isRequired,
  placeValues: PropTypes.object.isRequired,
  handlePlaceChange: PropTypes.func.isRequired,
};

Places.defaultProps = {};

export default Places;
