import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import constants from '../../context/constants';
import { withContext } from '../../context/WithContext';
import formHelper from '../../utils/formHelper';
import Content from '../_common/Content';
import CustomError from '../_common/CustomError';
import CustomForm from '../_common/CustomForm';
import BuildingForm from './BuildingForm';
import Places from './Places';

const defaultPlace = {
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

  const [buildingValues, setValues] = React.useState(defaultState);
  const [placeValues, setPlaceValues] = React.useState(defaultPlace);
  const [errorMessage, setErrorMessage] = React.useState({ errorMessage: undefined });

  const resetForm = () => {
    setValues(defaultState);
  };

  const changeBuildingValue = (field, newValue) => {
    setValues({ ...buildingValues, [field]: newValue });
  };

  const onBuildingChange = (type, event, name) => {
    changeBuildingValue(name, event.target.value);
  };

  const changePlaceValue = (field, newValue) => {
    setPlaceValues({ ...placeValues, [field]: newValue });
  };

  const onPlaceChange = (type, event, name) => {
    formHelper.onChange(type, event, name, changePlaceValue);
  };

  const onAddPlace = () => {
    const placeId = placeValues.number;
    const newPlaces = { ...buildingValues.places, [placeId]: { ...placeValues } };
    setValues({ ...buildingValues, places: newPlaces });
    setPlaceValues(defaultPlace);
  };

  const onSave = () => {
    context.saveBuilding(buildingValues).then(() => {
      resetForm();
    }).catch((err) => {
      setErrorMessage({ errorMessage: err.message });
    });
  };

  const { errorMessage: message } = errorMessage;

  return (
    <Content>
      <CustomError message={message} />
      <CustomForm>
        <Paper style={{ padding: 32 }}>
          <BuildingForm
            buildingTitle={buildingTitle}
            buildingValues={buildingValues}
            onBuildingChange={onBuildingChange}
          />
        </Paper>
        <Places
          placeTitle={placeTitle}
          allPlaces={buildingValues.places}
          placeValues={placeValues}
          onPlaceChange={onPlaceChange}
          onAddPlace={onAddPlace}
        />
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
