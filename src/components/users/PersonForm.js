import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';
import PropTypes from 'prop-types';
import constants from '../../constants/constants';
import shapes from "../../constants/shapes";
import CustomSelect from '../_common/CustomSelect';
import CustomSwitch from '../_common/CustomSwitch';
import CustomTextField from '../_common/CustomTextField';
import MeteorRating from '../_common/meteorRating/MeteorRating';

const PersonForm = (props) => {
  const { personValues, onPersonChange } = props;
  const {
    name,
    email,
    passwordOne,
    passwordTwo,
    isAdmin,
    id,
    bank,
    isActive,
    parkingMeteors,
  } = personValues;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
      <CustomTextField
        id="id"
        label="Cédula"
        value={id}
        onChange={(event) => onPersonChange(event)}
      />
      <CustomTextField
        id="name"
        label="Nombre"
        value={name}
        onChange={(event) => onPersonChange(event)}
      />
      <CustomTextField
        id="email"
        label="E-mail"
        value={email}
        onChange={(event) => onPersonChange(event)}
      />
      <CustomTextField
        type="password"
        id="passwordOne"
        label="Password"
        value={passwordOne}
        onChange={(event) => onPersonChange(event)}
      />
      <CustomTextField
        type="password"
        id="passwordTwo"
        label="Confirmar password"
        value={passwordTwo}
        onChange={(event) => onPersonChange(event)}
      />
      <CustomSelect
        id="bank"
        value={bank}
        label="Banco"
        values={constants.banks}
        onChange={(event) => onPersonChange(event)}
      />
      <div style={{ marginTop: 16 }}>
        <CustomSwitch
          checked={isAdmin}
          handleSwitchChange={(event) => onPersonChange(event)}
          id="isAdmin"
          label="Admin"
        />
        <CustomSwitch
          checked={isActive}
          handleSwitchChange={(event) => onPersonChange(event)}
          id="isActive"
          label="Activo"
        />
      </div>
      <FormControlLabel
        value="top"
        control={(
          <MeteorRating
            id="parkingMeteors"
            value={parkingMeteors}
            onChange={(event) => onPersonChange(event)}
          />
        )}
        label="Parking"
        labelPlacement="top"
        style={{ marginTop: 8, textAlign: 'left' }}
      />
    </div>
  );
};

PersonForm.propTypes = {
  personValues: PropTypes.shape(shapes.user),
  onPersonChange: PropTypes.func.isRequired,
};

PersonForm.defaultProps = {
  personValues: {},
};

export default PersonForm;
