import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { omit } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import constants from '../../constants/constants';
import routes from '../../constants/routes';
import CardTitle from '../_common/CardTitle';
import Content from '../_common/Content';
import CustomError from '../_common/CustomError';
import CustomForm from '../_common/CustomForm';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';
import BuildingForm from './BuildingForm';
import PlacesSummary from './PlacesSummary';

const INITIAL_PLACE = {
  id: '',
  size: constants.carSizes.medium.value,
  number: '',
  price: 0,
  isActive: true,
  owner: '',
  ownerInfo: '',
  ownerPayment: '',
  otherInfo: '',
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

const BuildingFormPage = ({ firebase, history, match }) => {
  const editId = match.params.id;
  const [buildingValues, setBuildingValues] = React.useState(INITIAL_BUILDING);
  const [placeValues, setPlaceValues] = React.useState(INITIAL_PLACE);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [isEditing, setEditing] = useState(false);
  const [editingPlaceId, setEditingPlaceId] = useState(null);

  useEffect(() => {
    if (editId !== undefined) {
      firebase.building(editId).on('value', (snapshot) => {
        const editUser = snapshot.val();
        setBuildingValues({ ...INITIAL_BUILDING, ...editUser });
        setEditing(true);
      });
    }

    return function cleanup() {
      firebase.users().off();
    };
  }, [firebase, editId]);

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
    let placeId = new Date().getTime();
    if (editingPlaceId !== null) {
      placeId = editingPlaceId;
      setEditingPlaceId(null);
    }
    const newPlaceValues = { ...placeValues, id: placeId };
    const newPlaces = { ...buildingValues.places, [placeId]: newPlaceValues };
    setBuildingValues({ ...buildingValues, places: newPlaces });
    setPlaceValues(INITIAL_PLACE);
  };

  const onDeletePlace = (id) => {
    const newPlaces = omit(buildingValues.places, id);
    setBuildingValues({ ...buildingValues, places: newPlaces });
  };

  const onEditPlace = (id) => {
    setEditingPlaceId(id);
    setPlaceValues({ ...INITIAL_PLACE, ...buildingValues.places[id] });
  };

  const onSubmit = (event, redirect) => {
    setLoading(true);

    const newBuilding = { ...buildingValues };
    if (isEditing) {
      firebase
        .building(editId)
        .set(newBuilding)
        .then(() => {
          setLoading(false);
          history.push(routes.BUILDINGS);
        });
    } else {
      const newRef = firebase.buildings().push();
      newBuilding.id = newRef.key;
      newBuilding.uid = newRef.key;

      firebase
        .building(newBuilding.id)
        .set(newBuilding)
        .then(() => {
          setBuildingValues(INITIAL_BUILDING);
          setPlaceValues(INITIAL_PLACE);
          setLoading(false);
          if (redirect) {
            history.push(routes.BUILDINGS);
          }
        })
        .catch((error) => {
          setErrorMessage(error);
          setLoading(false);
        });
    }
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
          <CardTitle label="Edificio" icon="warehouse" />
          <BuildingForm
            onBuildingChange={(event) => onBuildingChange(event)}
            buildingValues={buildingValues}
          />
        </Paper>
        <Paper style={{ padding: 32 }}>
          <CardTitle label="Puesto" icon="draw-square" />
          <PlacesSummary
            onPlaceChange={(event) => onPlaceChange(event)}
            onAddPlace={() => onAddPlace()}
            onDeletePlace={(id) => onDeletePlace(id)}
            onEditPlace={(id) => onEditPlace(id)}
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
            onClick={(event) => onSubmit(event, true)}
          >
            <FontAwesomeIcon icon={['far', icon]} pulse={isLoading} style={{ marginRight: 16 }} />
            Guardar
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ margin: '24px 0' }}
            disabled={isInvalid || isLoading}
            onClick={(event) => onSubmit(event, false)}
          >
            <FontAwesomeIcon icon={['far', icon]} pulse={isLoading} style={{ marginRight: 16 }} />
            Guardar y agregar otro
          </Button>
        </div>
      </CustomForm>
    </Content>
  );
};

BuildingFormPage.propTypes = {
  firebase: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
  match: PropTypes.object.isRequired,
};

export default compose(
  withAuthorization(conditions.isAdminUser),
  withFirebase,
  withRouter,
)(BuildingFormPage);
