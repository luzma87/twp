import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import constants from '../../context/constants';
import CustomSelect from '../_common/CustomSelect';
import CustomTextField from '../_common/CustomTextField';

const CarForm = (props) => {
  const {
    carTitle, carValues,
    handleCarChange, onCarSizeChanged,
  } = props;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
      <Typography variant="h5">
        <FontAwesomeIcon icon={['far', 'rocket']} style={{ marginRight: 16 }} />
        {carTitle}
      </Typography>

      <CustomTextField
        id="brand"
        label="Marca"
        value={carValues.brand}
        onChange={handleCarChange('brand')}
        margin={false}
      />
      <CustomTextField
        id="model"
        label="Modelo"
        value={carValues.model}
        onChange={handleCarChange('model')}
      />
      <CustomTextField
        id="plate"
        label="Placa"
        value={carValues.plate}
        onChange={handleCarChange('plate')}
      />
      <CustomSelect
        id="carSize"
        value={carValues.size}
        label="Tamaño"
        values={constants.carSizes}
        onChange={onCarSizeChanged}
      />
    </div>
  );
};

CarForm.propTypes = {
  carTitle: PropTypes.string.isRequired,
  carValues: PropTypes.object.isRequired,
  handleCarChange: PropTypes.func.isRequired,
  onCarSizeChanged: PropTypes.func.isRequired,
};

CarForm.defaultProps = {};

export default CarForm;
