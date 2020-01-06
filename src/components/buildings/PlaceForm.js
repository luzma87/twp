import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormControlLabel, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import constants from '../../constants/constants';
import shapes from '../../constants/shapes';
import CustomSelect from '../_common/CustomSelect';
import CustomSwitch from '../_common/CustomSwitch';
import CustomTextField from '../_common/CustomTextField';
import MeteorRating from '../_common/meteorRating/MeteorRating';

const PlaceForm = (props) => {
  const { placeValues, onPlaceChange, onAddPlace } = props;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
      <CustomSelect
        id="size"
        value={placeValues.size}
        label="Tamaño"
        values={constants.carSizes}
        onChange={(event) => onPlaceChange(event)}
      />
      <CustomTextField
        id="number"
        label="Número"
        value={placeValues.number.toString()}
        onChange={(event) => onPlaceChange(event)}
      />
      <CustomTextField
        id="price"
        label="Precio"
        value={placeValues.price.toString()}
        onChange={(event) => onPlaceChange(event)}
      />
      <CustomTextField
        id="owner"
        label="Nombre dueño"
        value={placeValues.owner}
        onChange={(event) => onPlaceChange(event)}
      />
      <CustomTextField
        id="ownerInfo"
        label="Email dueño"
        value={placeValues.ownerInfo}
        onChange={(event) => onPlaceChange(event)}
      />
      <CustomTextField
        id="ownerPayment"
        label="Banco dueño"
        value={placeValues.ownerPayment}
        onChange={(event) => onPlaceChange(event)}
      />
      <CustomTextField
        id="otherInfo"
        label="Más información"
        multiline
        rows={4}
        value={placeValues.otherInfo}
        onChange={(event) => onPlaceChange(event)}
      />
      <FormControlLabel
        value="top"
        control={(
          <MeteorRating
            id="difficulty"
            value={placeValues.difficulty}
            onChange={(event) => onPlaceChange(event)}
          />
        )}
        label="Difficulty"
        labelPlacement="top"
        style={{ marginTop: 16, textAlign: 'left' }}
      />
      <div style={{ marginTop: 16 }}>
        <CustomSwitch
          id="isActive"
          label="Activo"
          checked={placeValues.isActive}
          handleSwitchChange={(event) => onPlaceChange(event)}
        />
      </div>
      <div style={{ marginTop: 24 }}>
        <IconButton
          color="secondary"
          onClick={onAddPlace}
        >
          <FontAwesomeIcon icon={['far', 'plus-hexagon']} />
        </IconButton>
      </div>
    </div>
  );
};

PlaceForm.propTypes = {
  placeValues: PropTypes.shape(shapes.place),
  onPlaceChange: PropTypes.func.isRequired,
  onAddPlace: PropTypes.func.isRequired,
};

PlaceForm.defaultProps = {
  placeValues: {},
};

export default PlaceForm;
