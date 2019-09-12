import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { omit } from 'lodash';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import constants from '../../constants/constants';
import Content from '../_common/Content';
import CustomError from '../_common/CustomError';
import CustomForm from '../_common/CustomForm';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';
import BuildingForm from './BuildingForm';
import PlacesSummary from './PlacesSummary';

const INITIAL_PLACE = {
  size: constants.carSizes.medium,
  number: '',
  price: 0,
  isActive: true,
  owner: '',
  difficulty: 1,
  paymentInformation: '',
};

const INITIAL_BUILDING = {
  name: '',
  address: '',
  coords: { lat: 0, long: 0 },
  observations: '',
  places: {},
  isActive: true,
};

const BuildingFormPage = ({ firebase }) => {
  const [buildingValues, setBuildingValues] = React.useState(INITIAL_BUILDING);
  const [placeValues, setPlaceValues] = React.useState(INITIAL_PLACE);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const onBuildingChange = (event) => {
    setBuildingValues({ ...buildingValues, [event.target.name]: event.target.value });
  };

  const onPlaceChange = (event) => {
    let { value } = event.target;
    const { name } = event.target;
    if (name === 'price') {
      value = parseFloat(value);
    }
    setPlaceValues({ ...placeValues, [name]: value });
  };

  const onAddPlace = () => {
    const placeId = placeValues.number;
    const newPlaces = { ...buildingValues.places, [placeId]: { ...placeValues } };
    setBuildingValues({ ...buildingValues, places: newPlaces });
    setPlaceValues(INITIAL_PLACE);
  };

  const onDeletePlace = (id) => {
    const newPlaces = omit(buildingValues.places, id);
    setBuildingValues({ ...buildingValues, places: newPlaces });
  };

  const onSubmit = (event) => {
    setLoading(true);

    const newRef = firebase.buildings().push();
    const newBuilding = { ...buildingValues };
    newBuilding.id = newRef.key;
    newBuilding.uid = newRef.key;

    firebase
      .building(newBuilding.id)
      .set(newBuilding)
      .then(() => {
        setBuildingValues(INITIAL_BUILDING);
        setPlaceValues(INITIAL_PLACE);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error);
        setLoading(false);
      });
    event.preventDefault();
  };

  const {
    name,
    address,
    places,
  } = buildingValues;

  const isInvalid = name === ''
    || address === ''
    || !places
    || Object.keys(places).length === 0;
  const icon = isLoading ? 'spinner' : 'save';

  return (
    <Content>
      <CustomError error={errorMessage} />
      <CustomForm onSubmit={(event) => onSubmit(event)}>
        <Paper style={{ padding: 32 }}>
          <Typography variant="h5">
            <FontAwesomeIcon icon={['far', 'warehouse']} style={{ marginRight: 16 }} />
            Edificio
          </Typography>
          <BuildingForm
            onBuildingChange={(event) => onBuildingChange(event)}
            buildingValues={buildingValues}
          />
        </Paper>
        <Paper style={{ padding: 32 }}>
          <Typography variant="h5">
            <FontAwesomeIcon icon={['far', 'draw-square']} style={{ marginRight: 16 }} />
            Puesto
          </Typography>
          <PlacesSummary
            onPlaceChange={(event) => onPlaceChange(event)}
            onAddPlace={() => onAddPlace()}
            onDeletePlace={(id) => onDeletePlace(id)}
            allPlaces={buildingValues.places}
            placeValues={placeValues}
          />
        </Paper>
        <div />
        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ margin: '24px 0' }}
            disabled={isInvalid || isLoading}
            onClick={(event) => onSubmit(event)}
          >
            <FontAwesomeIcon icon={['far', icon]} pulse={isLoading} style={{ marginRight: 16 }} />
            Guardar
          </Button>
        </div>
      </CustomForm>
    </Content>
  );
};

BuildingFormPage.propTypes = {
  firebase: PropTypes.any.isRequired,
};

export default compose(
  withAuthorization(conditions.isAdminUser),
  withFirebase,
)(BuildingFormPage);
