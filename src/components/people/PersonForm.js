import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import React from 'react';
import constants from "../../context/constants";
import { withContext } from "../../context/WithContext";
import Content from "../_common/Content";
import CustomSelect from "../_common/CustomSelect";
import MeteorRating from "../_common/meteorRating/MeteorRating";

const defaultState = {
  showPassword: false,
  person: {
    id: '',
    name: '',
    email: '',
    password: '',
    admin: false,
    active: true,
    parkingMeteors: 1,
    car: {
      brand: '',
      model: '',
      plate: '',
      size: constants.carSizes.medium
    }
  }
};

const PersonForm = (props) => {
  const {match, context} = props;
  const {personId} = match.params;
  const personTitle = personId === ':personId' ? 'Nueva persona' : `Persona ${personId}`;
  const carTitle = personId === ':personId' ? 'Nuevo auto' : `Auto de ${personId}`;

  const [values, setValues] = React.useState(defaultState);

  const resetForm = () => {
    setValues(defaultState);
  };

  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword});
  };

  const handlePersonChange = name => event => {
    const newPerson = {...values.person, [name]: event.target.value};
    setValues({...values, person: newPerson});
  };

  const handlePersonSwitchChange = name => event => {
    const newPerson = {...values.person, [name]: event.target.checked};
    setValues({...values, person: newPerson});
  };

  const onRatingClicked = (val) => {
    const newPerson = {...values.person, parkingMeteors: val};
    setValues({...values, person: newPerson});
  };

  const handleCarChange = name => event => {
    const newCar = {...values.person.car, [name]: event.target.value};
    const newPerson = {...values.person, car: newCar};
    setValues({...values, person: newPerson});
  };

  const onCarSizeChanged = (val) => {
    const newCar = {...values.person.car, size: val};
    const newPerson = {...values.person, car: newCar};
    setValues({...values, person: newPerson});
  };

  const onSave = () => {
    resetForm();
    context.savePerson(values.person)
  };

  const tfStyle = {};
  const personValues = values.person;
  const carValues = personValues.car;

  return (
    <Content>
      <form
        style={{
          display: 'grid',
          gridTemplateColumns: '250px 250px',
          gridColumnGap: 72
        }}
      >
        <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column'}}>
          <Typography variant="h5">
            <FontAwesomeIcon icon={['far', 'user-astronaut']} style={{marginRight: 16}} />
            {personTitle}
          </Typography>

          <TextField
            id="id"
            label="Cédula"
            value={personValues.id}
            onChange={handlePersonChange('id')}
            margin="normal"
            style={tfStyle}
          />
          <TextField
            id="name"
            label="Nombre"
            value={personValues.name}
            onChange={handlePersonChange('name')}
            margin="normal"
            style={tfStyle}
          />
          <TextField
            id="email"
            label="E-mail"
            value={personValues.email}
            onChange={handlePersonChange('email')}
            margin="normal"
            style={tfStyle}
          />

          <FormControl style={{...tfStyle, marginTop: 16}}>
            <InputLabel htmlFor="adornment-password">Password</InputLabel>
            <Input
              id="adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={personValues.password}
              onChange={handlePersonChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="Toggle password visibility" onClick={handleClickShowPassword}>
                    {values.showPassword
                      ? <FontAwesomeIcon icon={['far', 'eye']} />
                      : <FontAwesomeIcon icon={['far', 'eye-slash']} />
                    }
                  </IconButton>
                </InputAdornment>
              }
            />

          </FormControl>
          <div style={{marginTop: 16}}>
            <FormControlLabel
              value="top"
              control={<Switch
                checked={personValues.admin}
                onChange={handlePersonSwitchChange('admin')}
                value="admin"
                color="primary"
              />}
              label="Admin"
              labelPlacement="top"
            />
            <FormControlLabel
              value="top"
              control={<Switch
                checked={personValues.active}
                onChange={handlePersonSwitchChange('active')}
                value="active"
                color="primary"
              />}
              label="Activo"
              labelPlacement="top"
            />
          </div>

          <FormControlLabel
            value="top"
            control={<MeteorRating value={personValues.parkingMeteors} onClick={onRatingClicked} />}
            label="Parking stars"
            labelPlacement="top"
            style={{marginTop: 8, textAlign: 'left'}}
          />

        </div>

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
            margin="normal"
            style={tfStyle}
          />
          <TextField
            id="model"
            label="Modelo"
            value={carValues.model}
            onChange={handleCarChange('model')}
            margin="normal"
            style={tfStyle}
          />
          <TextField
            id="plate"
            label="Placa"
            value={carValues.plate}
            onChange={handleCarChange('plate')}
            margin="normal"
            style={tfStyle}
          />
          <CustomSelect
            id="carSize"
            value={carValues.size}
            label="Tamaño"
            values={constants.carSizes}
            onChange={onCarSizeChanged}
          />
        </div>

        <div />
        <div style={{marginTop: 24, textAlign: 'right'}}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onSave}
          >
            <FontAwesomeIcon icon={['far', 'save']} style={{marginRight: 16}} />
            Save
          </Button>
        </div>
      </form>
    </Content>
  )
};

PersonForm.propTypes = {
  match: PropTypes.object.isRequired,
  context: PropTypes.any.isRequired
};

PersonForm.defaultProps = {};

export default withContext(PersonForm);
