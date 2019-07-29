import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import PropTypes from 'prop-types';
import CustomTextField from "../_common/CustomTextField";

const BuildingForm = (props) => {
  const {
    buildingTitle, buildingValues, handleBuildingChange
  } = props;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
      <Typography variant="h5">
        <FontAwesomeIcon icon={['far', 'warehouse']} style={{ marginRight: 16 }} />
        {buildingTitle}
      </Typography>

      <CustomTextField
        id="name"
        label="Nombre"
        value={buildingValues.name}
        onChange={handleBuildingChange('name')}
      />
      <CustomTextField
        id="address"
        label="Dirección"
        multiline
        rows={4}
        value={buildingValues.address}
        onChange={handleBuildingChange('address')}
      />
      <CustomTextField
        id="observations"
        label="Observaciones"
        multiline
        rows={4}
        value={buildingValues.observations}
        onChange={handleBuildingChange('observations')}
      />
    </div>
  );
};

BuildingForm.propTypes = {
  buildingTitle: PropTypes.string.isRequired,
  buildingValues: PropTypes.object.isRequired,
  handleBuildingChange: PropTypes.func.isRequired,
};

BuildingForm.defaultProps = {};

export default BuildingForm;
