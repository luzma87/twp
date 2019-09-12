import React from 'react';
import PropTypes from 'prop-types';
import shapes from '../../constants/shapes';
import CustomSwitch from '../_common/CustomSwitch';
import CustomTextField from '../_common/CustomTextField';

const BuildingForm = (props) => {
  const { buildingValues, onBuildingChange } = props;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
      <CustomTextField
        id="name"
        label="Nombre"
        value={buildingValues.name}
        onChange={(event) => onBuildingChange(event)}
      />
      <CustomTextField
        id="address"
        label="Dirección"
        multiline
        rows={4}
        value={buildingValues.address}
        onChange={(event) => onBuildingChange(event)}
      />
      <CustomTextField
        id="observations"
        label="Observaciones"
        multiline
        rows={4}
        value={buildingValues.observations}
        onChange={(event) => onBuildingChange(event)}
      />
      <div style={{ marginTop: 16 }}>
        <CustomSwitch
          id="isActive"
          label="Activo"
          checked={buildingValues.isActive}
          handleSwitchChange={(event) => onBuildingChange(event)}
        />
      </div>
    </div>
  );
};

BuildingForm.propTypes = {
  buildingValues: PropTypes.shape(shapes.building),
  onBuildingChange: PropTypes.func.isRequired,
};

BuildingForm.defaultProps = {
  buildingValues: {},
};

export default BuildingForm;
