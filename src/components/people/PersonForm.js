import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import constants from '../../context/constants';
import CustomSelect from '../_common/CustomSelect';
import CustomTextField from '../_common/CustomTextField';
import MeteorRating from '../_common/meteorRating/MeteorRating';

const PersonForm = (props) => {
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const {
    personTitle, personValues,
    handlePersonChange, handlePersonSwitchChange,
    onRatingClicked, onBankChanged,
  } = props;

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const makeSwitch = (checked, id, label) => (
    <FormControlLabel
      value="top"
      control={(
        <Switch
          checked={checked}
          onChange={handlePersonSwitchChange(id)}
          value={id}
          color="primary"
        />
      )}
      label={label}
      labelPlacement="top"
    />
  );
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
      <Typography variant="h5">
        <FontAwesomeIcon icon={['far', 'user-astronaut']} style={{ marginRight: 16 }} />
        {personTitle}
      </Typography>

      <CustomTextField
        id="id"
        label="Cédula"
        value={personValues.id}
        onChange={handlePersonChange('id')}
        margin={false}
      />
      <CustomTextField
        id="name"
        label="Nombre"
        value={personValues.name}
        onChange={handlePersonChange('name')}
      />
      <CustomTextField
        id="email"
        label="E-mail"
        value={personValues.email}
        onChange={handlePersonChange('email')}
      />

      <FormControl style={{ marginTop: 16 }}>
        <InputLabel htmlFor="adornment-password">Password</InputLabel>
        <Input
          id="adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={personValues.password}
          onChange={handlePersonChange('password')}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton aria-label="Toggle password visibility" onClick={handleClickShowPassword}>
                {values.showPassword
                  ? <FontAwesomeIcon icon={['far', 'eye']} />
                  : <FontAwesomeIcon icon={['far', 'eye-slash']} />
                }
              </IconButton>
            </InputAdornment>
          )}
        />

        <CustomSelect
          id="bank"
          value={personValues.bank}
          label="Banco"
          values={constants.banks}
          onChange={onBankChanged}
        />

      </FormControl>
      <div style={{ marginTop: 16 }}>
        {makeSwitch(personValues.admin, 'admin', 'Admin')}
        {makeSwitch(personValues.active, 'active', 'Activo')}
      </div>

      <FormControlLabel
        value="top"
        control={<MeteorRating value={personValues.parkingMeteors} onClick={onRatingClicked} />}
        label="Parking"
        labelPlacement="top"
        style={{ marginTop: 8, textAlign: 'left' }}
      />
    </div>
  );
};

PersonForm.propTypes = {
  personTitle: PropTypes.string.isRequired,
  personValues: PropTypes.object.isRequired,
  handlePersonChange: PropTypes.func.isRequired,
  handlePersonSwitchChange: PropTypes.func.isRequired,
  onRatingClicked: PropTypes.func.isRequired,
  onBankChanged: PropTypes.func.isRequired,
};

PersonForm.defaultProps = {};

export default PersonForm;
