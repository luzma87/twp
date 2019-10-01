import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box, Grid, IconButton, Tooltip,
} from '@material-ui/core';
import { withTheme } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import constants from '../../constants/constants';
import shapes from '../../constants/shapes';
import PlaceForm from './PlaceForm';

const PlacesSummary = (props) => {
  const {
    placeValues, onPlaceChange, onAddPlace, onDeletePlace, onEditPlace, allPlaces, theme,
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
            padding: 8,
            marginTop: 8,
            border: 'solid 1px',
            borderRadius: 5,
            borderColor: theme.palette.grey[600],
          }}
        >
          <Grid container justify="space-between">
            <Grid item>
              {`#${place.number}, ${place.difficulty}*, ${constants.carSizeLabel(place.size)}, ${place.owner}, $${place.price}`}
            </Grid>
            <Grid item>
              <Tooltip title="Editar">
                <IconButton
                  color="primary"
                  size="small"
                  style={{ marginLeft: 8 }}
                  onClick={() => onEditPlace(place.id)}
                >
                  <FontAwesomeIcon icon={['far', 'pencil-alt']} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Eliminar">
                <IconButton
                  color="secondary"
                  size="small"
                  onClick={() => onDeletePlace(place.id)}
                >
                  <FontAwesomeIcon icon={['far', 'trash-alt']} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
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
  theme: PropTypes.any.isRequired,
};

PlacesSummary.defaultProps = {
  placeValues: {},
};

export default withTheme(PlacesSummary);
