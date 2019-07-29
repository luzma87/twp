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
import BuildingForm from './BuildingForm';

const defaultSpace = {
  size: constants.carSizes.medium,
  number: '',
  price: 0,
  active: true,
  owner: '',
  difficulty: 1,
  paymentInformation: '',
};

const defaultState = {
  id: '',
  name: '',
  address: '',
  coords: { lat: 0, long: 0 },
  observations: '',
  places: {},
  active: true,
};

const BuildingPlaceForm = (props) => {
  const { match, context } = props;
  const { buildingId } = match.params;
  const buildingTitle = buildingId === ':buildingId' ? 'Nuevo edificio' : `Edificio ${buildingId}`;
  const placeTitle = buildingId === ':buildingId' ? 'Nuevo puesto' : `Puesto de ${buildingId}`;

  const [values, setValues] = React.useState(defaultState);
  const [errorMessage, setErrorMessage] = React.useState({ errorMessage: undefined });

  const resetForm = () => {
    setValues(defaultState);
  };

  const changeBuildingValue = (field, newValue) => {
    setValues({ ...values, [field]: newValue });
  };

  const handleBuildingChange = name => (event) => {
    changeBuildingValue(name, event.target.value);
  };

  const onSave = () => {
    context.saveBuilding(values).then(() => {
      resetForm();
    }).catch((err) => {
      setErrorMessage({ errorMessage: err.message });
    });
  };

  const buildingValues = values;
  const { errorMessage: message } = errorMessage;

  return (
    <Content>
      <CustomError message={message} />
      <CustomForm>
        <Paper style={{ padding: 32 }}>
          <BuildingForm
            buildingTitle={buildingTitle}
            buildingValues={buildingValues}
            handleBuildingChange={handleBuildingChange}
          />
        </Paper>
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

BuildingPlaceForm.propTypes = {
  match: PropTypes.object.isRequired,
  context: PropTypes.any.isRequired,
};

BuildingPlaceForm.defaultProps = {};

export default withContext(BuildingPlaceForm);
