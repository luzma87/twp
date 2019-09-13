import React from 'react';
import PropTypes from 'prop-types';
import constants from '../../constants/constants';
import shapes from '../../constants/shapes';
import CustomSelect from '../_common/CustomSelect';
import CustomTextField from '../_common/CustomTextField';

const CarForm = (props) => {
  const { carValues, onCarChange } = props;
  const {
    brand, model, plate, size,
  } = carValues;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
      <CustomTextField
        id="brand"
        label="Marca"
        value={brand}
        onChange={(event) => onCarChange(event)}
      />
      <CustomTextField
        id="model"
        label="Modelo"
        value={model}
        onChange={(event) => onCarChange(event)}
      />
      <CustomTextField
        id="plate"
        label="Placa"
        value={plate.toUpperCase()}
        onChange={(event) => onCarChange(event)}
      />
      <CustomSelect
        id="size"
        value={size}
        label="Tamaño"
        values={constants.carSizes}
        onChange={(event) => onCarChange(event)}
      />
    </div>
  );
};

CarForm.propTypes = {
  carValues: PropTypes.shape(shapes.car),
  onCarChange: PropTypes.func.isRequired,
};

CarForm.defaultProps = {
  carValues: {},
};

export default CarForm;
