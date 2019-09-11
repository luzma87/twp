import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import CustomSwitch from "../_common/CustomSwitch";
import CustomTextField from '../_common/CustomTextField';

const BuildingForm = (props) => {
  const {
    buildingTitle, buildingValues, onBuildingChange,
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
        onChange={(event) => onBuildingChange('text', event, 'name')}
      />
      <CustomTextField
        id="address"
        label="Dirección"
        multiline
        rows={4}
        value={buildingValues.address}
        onChange={(event) => onBuildingChange('text', event, 'address')}
      />
      <CustomTextField
        id="observations"
        label="Observaciones"
        multiline
        rows={4}
        value={buildingValues.observations}
        onChange={(event) => onBuildingChange('text', event, 'observations')}
      />
      <div style={{ marginTop: 16 }}>
        <CustomSwitch
          id="active"
          label="Activo"
          checked={buildingValues.active}
          handleSwitchChange={(event) => onBuildingChange('switch', event, 'active')}
        />
      </div>
    </div>
  );
};

BuildingForm.propTypes = {
  buildingTitle: PropTypes.string.isRequired,
  buildingValues: PropTypes.object.isRequired,
  onBuildingChange: PropTypes.func.isRequired,
};

BuildingForm.defaultProps = {};

export default BuildingForm;
