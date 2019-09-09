import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import PropTypes from 'prop-types';
import constants from '../../context/constants';
import CustomSelect from '../_common/CustomSelect';
import CustomSwitch from '../_common/CustomSwitch';
import CustomTextField from '../_common/CustomTextField';

const PlaceForm = (props) => {
  const {
    placeTitle, placeValues, handlePlaceChange,
  } = props;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
      <Typography variant="h5">
        <FontAwesomeIcon icon={['far', 'draw-square']} style={{ marginRight: 16 }} />
        {placeTitle}
      </Typography>
      <CustomSelect
        id="size"
        value={placeValues.size}
        label="Tamaño"
        values={constants.carSizes}
        onChange={(event) => {
          handlePlaceChange('select', event, 'size');
        }}
      />
      <CustomTextField
        id="number"
        label="Número"
        value={placeValues.number.toString()}
        onChange={(event) => {
          handlePlaceChange('text', event, 'number');
        }}
      />
      <CustomTextField
        id="price"
        label="Precio"
        value={placeValues.price.toString()}
        onChange={(event) => {
          handlePlaceChange('text', event, 'price');
        }}
      />
      <CustomTextField
        id="owner"
        label="Info dueño"
        multiline
        rows={4}
        value={placeValues.owner}
        onChange={(event) => { handlePlaceChange('text', event, 'owner'); }}
      />
      <div style={{ marginTop: 16 }}>
        <CustomSwitch
          checked={placeValues.active}
          handleSwitchChange={(id) => {
            handlePlaceChange('switch', null, id);
          }}
          id="active"
          label="Activo"
        />
      </div>
    </div>
  );
};

PlaceForm.propTypes = {
  placeTitle: PropTypes.string.isRequired,
  placeValues: PropTypes.object.isRequired,
  handlePlaceChange: PropTypes.func.isRequired,
};

PlaceForm.defaultProps = {};

export default PlaceForm;
