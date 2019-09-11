import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import constants from '../../context/constants';
import CustomSelect from '../_common/CustomSelect';
import CustomTextField from '../_common/CustomTextField';

const CarForm = (props) => {
  const { carTitle, carValues, onCarChange } = props;

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
        onChange={(event) => onCarChange('text', event, 'brand')}
        margin={false}
      />
      <CustomTextField
        id="model"
        label="Modelo"
        value={carValues.model}
        onChange={(event) => onCarChange('text', event, 'model')}
      />
      <CustomTextField
        id="plate"
        label="Placa"
        value={carValues.plate}
        onChange={(event) => onCarChange('text', event, 'plate')}
      />
      <CustomSelect
        id="carSize"
        value={carValues.size}
        label="Tamaño"
        values={constants.carSizes}
        onChange={(event) => onCarChange('select', event, 'size')}
      />
    </div>
  );
};

CarForm.propTypes = {
  carTitle: PropTypes.string.isRequired,
  carValues: PropTypes.object.isRequired,
  onCarChange: PropTypes.func.isRequired,
};

CarForm.defaultProps = {};

export default CarForm;
