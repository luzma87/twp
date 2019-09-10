import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import constants from '../../context/constants';
import { withContext } from '../../context/WithContext';
import Content from '../_common/Content';
import CustomError from '../_common/CustomError';
import CustomForm from '../_common/CustomForm';
import CarForm from './CarForm';
import PersonForm from './PersonForm';

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
    size: constants.carSizes.medium,
  },
};

const PersonCarForm = (props) => {
  const { match, context } = props;
  const { personId } = match.params;
  const personTitle = personId === ':personId' ? 'Nueva persona' : `Persona ${personId}`;
  const carTitle = personId === ':personId' ? 'Nuevo auto' : `Auto de ${personId}`;

  const [values, setValues] = React.useState(defaultState);
  const [errorMessage, setErrorMessage] = React.useState({ errorMessage: undefined });

  const resetForm = () => {
    setValues(defaultState);
  };

  const changePersonValue = (field, newValue) => {
    setValues({ ...values, [field]: newValue });
  };

  const changeCarValue = (field, newValue) => {
    const newCar = { ...values.car, [field]: newValue };
    changePersonValue('car', newCar);
  };

  const onCarChange = (type, event, name) => {
    switch (type) {
      case 'text':
        changeCarValue(name, event.target.value);
        break;
      case 'select':
        changeCarValue(name, event);
        break;
      default:
        break;
    }
  };

  const onPersonChange = (type, event, name) => {
    switch (type) {
      case 'text':
        changePersonValue(name, event.target.value);
        break;
      case 'select':
        changePersonValue(name, event);
        break;
      case 'switch':
        changePersonValue(name, !values[name]);
        break;
      case 'rating':
        changePersonValue('parkingMeteors', event);
        break;
      default:
        break;
    }
  };

  const onSave = () => {
    context.savePerson(values).then((what) => {
      resetForm();
    }).catch((err) => {
      setErrorMessage({ errorMessage: err.message });
    });
  };

  const personValues = values;
  const carValues = personValues.car;
  const { errorMessage: message } = errorMessage;

  return (
    <Content>
      <CustomError message={message} />
      <CustomForm>
        <Paper style={{ padding: 32 }}>
          <PersonForm
            personTitle={personTitle}
            personValues={personValues}
            onPersonChange={onPersonChange}
          />
        </Paper>

        <Paper style={{ padding: 32 }}>
          <CarForm
            carTitle={carTitle}
            carValues={carValues}
            onCarChange={onCarChange}
          />
        </Paper>

        <div />
        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onSave}
          >
            <FontAwesomeIcon icon={['far', 'save']} style={{ marginRight: 16 }} />
            Guardar
          </Button>
        </div>
      </CustomForm>
    </Content>
  );
};

PersonCarForm.propTypes = {
  match: PropTypes.object.isRequired,
  context: PropTypes.any.isRequired,
};

PersonCarForm.defaultProps = {};

export default withContext(PersonCarForm);
