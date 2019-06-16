import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';
import React from 'react';
import constants from "../../context/constants";
import { withContext } from "../../context/WithContext";
import Content from "../_common/Content";
import CarForm from "./CarForm";
import PersonForm from "./PersonForm";

const defaultState = {
  id: '',
  name: '',
  email: '',
  password: '',
  bank: constants.banks.pichincha,
  admin: false,
  active: true,
  parkingMeteors: 1,
  car: {
    brand: '',
    model: '',
    plate: '',
    size: constants.carSizes.medium
  }
};

const PersonCarForm = (props) => {
  const {match, context} = props;
  const {personId} = match.params;
  const personTitle = personId === ':personId' ? 'Nueva persona' : `Persona ${personId}`;
  const carTitle = personId === ':personId' ? 'Nuevo auto' : `Auto de ${personId}`;

  const [values, setValues] = React.useState(defaultState);

  const resetForm = () => {
    setValues(defaultState);
  };

  const changePersonValue = (field, newValue) => {
    setValues({...values, [field]: newValue});
  };

  const changeCarValue = (field, newValue) => {
    const newCar = {...values.car, [field]: newValue};
    changePersonValue("car", newCar);
  };

  const handlePersonChange = name => event => {
    changePersonValue(name, event.target.value);
  };

  const handlePersonSwitchChange = name => event => {
    changePersonValue(name, event.target.checked);
  };

  const onRatingClicked = (val) => {
    changePersonValue("parkingMeteors", val);
  };

  const onBankChanged = (val) => {
    changePersonValue("bank", val);
  };

  const handleCarChange = name => event => {
    changeCarValue(name, event.target.value);
  };

  const onCarSizeChanged = (val) => {
    changeCarValue("size", val);
  };

  const onSave = () => {
    resetForm();
    context.savePerson(values)
  };

  const personValues = values;
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

        <PersonForm
          personTitle={personTitle}
          personValues={personValues}
          handlePersonChange={handlePersonChange}
          handlePersonSwitchChange={handlePersonSwitchChange}
          onRatingClicked={onRatingClicked}
          onBankChanged={onBankChanged}
        />

        <CarForm
          carTitle={carTitle}
          carValues={carValues}
          handleCarChange={handleCarChange}
          onCarSizeChanged={onCarSizeChanged}
        />

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

PersonCarForm.propTypes = {
  match: PropTypes.object.isRequired,
  context: PropTypes.any.isRequired
};

PersonCarForm.defaultProps = {};

export default withContext(PersonCarForm);
