import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import React from 'react';
import constants from "../../context/constants";
import CustomSelect from "../_common/CustomSelect";

const CarForm = (props) => {
  const {
    carTitle, carValues,
    handleCarChange, onCarSizeChanged
  } = props;

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column'}}>
      <Typography variant="h5">
        <FontAwesomeIcon icon={['far', 'rocket']} style={{marginRight: 16}} />
        {carTitle}
      </Typography>

      <TextField
        id="brand"
        label="Marca"
        value={carValues.brand}
        onChange={handleCarChange('brand')}
      />
      <TextField
        id="model"
        label="Modelo"
        value={carValues.model}
        onChange={handleCarChange('model')}
        style={{marginTop: 16}}
      />
      <TextField
        id="plate"
        label="Placa"
        value={carValues.plate}
        onChange={handleCarChange('plate')}
        style={{marginTop: 16}}
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
