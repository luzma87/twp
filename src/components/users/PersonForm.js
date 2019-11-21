import { FormControlLabel } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import constants from '../../constants/constants';
import shapes from '../../constants/shapes';
import CustomSelect from '../_common/CustomSelect';
import CustomSwitch from '../_common/CustomSwitch';
import CustomTextField from '../_common/CustomTextField';
import MeteorRating from '../_common/meteorRating/MeteorRating';

const PersonForm = (props) => {
  const {
    personValues, onPersonChange, isEditing, restricted,
  } = props;
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
    parkingDifficulty,
  } = personValues;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
      <CustomTextField
        id="id"
        label="Cédula"
        value={id}
        disabled={restricted}
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
        disabled={restricted || isEditing}
        onChange={(event) => onPersonChange(event)}
        autoComplete="username"
      />
      {isEditing ? null : (
        <CustomTextField
          type="password"
          id="passwordOne"
          label="Password"
          autoComplete="new-password"
          value={passwordOne}
          onChange={(event) => onPersonChange(event)}
        />
      )}
      {isEditing ? null : (
        <CustomTextField
          type="password"
          id="passwordTwo"
          label="Confirmar password"
          autoComplete="new-password"
          value={passwordTwo}
          onChange={(event) => onPersonChange(event)}
        />
      )}
      <CustomSelect
        id="bank"
        value={bank}
        label="Banco"
        values={constants.banks}
        onChange={(event) => onPersonChange(event)}
      />
      {restricted ? null : (
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
      )}
      <FormControlLabel
        value="top"
        control={(
          <MeteorRating
            id="parkingMeteors"
            value={parkingMeteors}
            onChange={(event) => onPersonChange(event)}
          />
        )}
        label="Mi parking skill"
        labelPlacement="top"
        style={{ marginTop: 8, textAlign: 'left' }}
      />
      <FormControlLabel
        value="top"
        control={(
          <MeteorRating
            id="parkingDifficulty"
            value={parkingDifficulty}
            onChange={(event) => onPersonChange(event)}
          />
        )}
        label="Dificultad de mi puesto"
        labelPlacement="top"
        style={{ marginTop: 8, textAlign: 'left' }}
      />
    </div>
  );
};

PersonForm.propTypes = {
  personValues: PropTypes.shape(shapes.user),
  isEditing: PropTypes.bool,
  restricted: PropTypes.bool,
  onPersonChange: PropTypes.func.isRequired,
};

PersonForm.defaultProps = {
  personValues: {},
  isEditing: false,
  restricted: false,
};

export default PersonForm;
