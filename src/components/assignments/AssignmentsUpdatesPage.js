import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import constants from '../../constants/constants';
import Content from '../_common/Content';
import CustomError from '../_common/CustomError';
import CustomLoader from '../_common/CustomLoader';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';
import AssignmentForm from './AssignmentForm';
import AssignmentsForUpdateTable from './AssignmentsForUpdateTable';

const getCurrentPaymentsId = (date) => `payment_${date.getMonth()}_${date.getFullYear()}`;

const getModal = (selected, open, handleClose, handleDelete) => {
  if (!selected) return null;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Eliminar asignación?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`Eliminar asignación de ${selected.user} en ${selected.place}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleDelete} color="primary" autoFocus>
          <FontAwesomeIcon icon={['far', 'trash-alt']} style={{ marginRight: 8 }} />
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ALL_BUILDINGS = {
  value: '-1',
  label: 'Todos',
};

const INITIAL_STATE = {
  place: {},
  user: {},
};

const createUserForSelect = (user) => ({
  value: user.uid,
  label: `${user.name} (${user.parkingMeteors}*)`,
});

const createPlaceForSelect = (building, place) => ({
  value: `${building.id}&&${place.id}`,
  label: `${building.name} #${place.number} (${place.difficulty}*)`,
});

const AssignmentsUpdatesPage = ({ firebase }) => {
  const [loadingUserPayments, setLoadingUserPayments] = useState(false);
  const [loadingBuildings, setLoadingBuildings] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [assignments, setAssignments] = useState([]);
  const [assignmentValues, setValues] = React.useState(INITIAL_STATE);
  const [date] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [availablePlaces, setAvailablePlaces] = useState({});
  const [availableUsers, setAvailableUsers] = useState({});

  useEffect(() => {
    setLoadingUserPayments(true);
    setLoadingBuildings(true);
    setLoadingUsers(true);
    const buildingsForFilterEdit = {};
    let availableUsersEdit = {};
    const availablePlacesEdit = {};

    firebase.users().on('value', (snapshotUsers) => {
      const usersObject = snapshotUsers.val();
      let usersList = [];
      if (usersObject) {
        usersList = Object.values(usersObject).filter((u) => u.isActive);
        usersList = usersList.sort(constants.userSort);

        const filteredAvailableUsers = usersList.filter((u) => u.place === undefined);
        availableUsersEdit = filteredAvailableUsers.reduce((acc, user, index) => {
          acc[`${index}_${user.uid}`] = createUserForSelect(user);
          return acc;
        }, {});
        setAvailableUsers(availableUsersEdit);
      }
      setLoadingUsers(false);
      firebase.buildings().on('value', (snapshotBuildings) => {
        const buildingsObject = snapshotBuildings.val();
        if (buildingsObject) {
          const buildingsList = Object.values(buildingsObject).filter((u) => u.isActive);
          buildingsForFilterEdit['-1'] = ALL_BUILDINGS;
          const usedBuildings = buildingsList.filter((building) => {
            const places = Object.values(building.places);
            const occupiedPlaces = places.filter((p) => p.user !== undefined).length;
            return occupiedPlaces > 0;
          });
          usedBuildings.forEach((building) => {
            buildingsForFilterEdit[building.uid] = {
              value: building.uid,
              label: building.name,
            };
          });

          let freePlacesList = [];
          buildingsList.forEach((building) => {
            const places = Object.values(building.places);
            const freePlaces = places.filter((p) => p.user === undefined);
            freePlaces.forEach((place) => {
              if (place.isActive) {
                const placeKey = `${building.uid}_${place.id}`;
                freePlacesList.push({ select: createPlaceForSelect(building, place), placeKey });
              }
            });
          });
          freePlacesList = freePlacesList.sort((a, b) => {
            if (a.select.label < b.select.label) {
              return -1;
            }
            if (a.select.label > b.select.label) {
              return 1;
            }
            return 0;
          });
          freePlacesList.reduce((acc, place) => {
            acc[place.placeKey] = place.select;
            return acc;
          }, availablePlacesEdit);
        }
        setAvailablePlaces(availablePlacesEdit);
        setLoadingBuildings(false);
      });
    });

    firebase.userPayment(getCurrentPaymentsId(date)).on('value', (snapshotUserPayments) => {
      const savedValues = snapshotUserPayments.val();
      setLoadingUserPayments(false);

      if (savedValues) {
        setLoadingUserPayments(false);
        setAssignments(savedValues.assignments);
      }
    });

    return function cleanup() {
      firebase.userPayments().off();
      firebase.buildings().off();
      firebase.users().off();
    };
  }, [firebase, date]);

  const handleClickOpen = (id, user, place) => {
    setSelected({ id, user, place });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onAssignmentChange = (event) => {
    setValues({ ...assignmentValues, [event.target.name]: event.target.value });
  };

  const updateAssignment = (uid, building, place, isDelete) => {
    setLoadingSave(true);
    const placeValue = isDelete ? null : { building, place };
    const userValue = isDelete ? null : uid;

    const updates = {};
    updates[`users/${uid}/place/`] = placeValue;
    updates[`buildings/${building}/places/${place}/user`] = userValue;
    if (isDelete) {
      const ref = firebase.userPayment(`${getCurrentPaymentsId(date)}/assignments/people/${selected.id}`);
      ref.remove();
    } else {
      const regex = / \(\d\*\)/;
      const newPlace = Object.values(availablePlaces)
        .filter((x) => x.value === `${building}&&${place}`)[0]
        .label
        .replace(regex, '');
      const newUser = Object.values(availableUsers)
        .filter((x) => x.value === uid)[0]
        .label
        .replace(regex, '');
      updates[`userPayments/${getCurrentPaymentsId(date)}/assignments/people/${uid}`] = {
        place: newPlace,
        user: newUser,
      };
    }

    firebase.databaseRef().update(updates)
      .then(() => {
        setValues(INITIAL_STATE);
        setLoadingSave(false);
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  const onSubmit = (event) => {
    const [building, place] = assignmentValues.place.split('&&');
    const { user } = assignmentValues;
    updateAssignment(user, building, place, false);
    event.preventDefault();
  };

  const onDelete = () => {
    const userId = selected.id;

    firebase.user(userId)
      .once('value')
      .then((snapshot) => {
        const userDb = snapshot.val();
        const { place, building } = userDb.place;
        updateAssignment(userId, building, place, true);
      });
    handleClose();
  };

  const isLoading = loadingUserPayments || loadingBuildings || loadingUsers;

  return (
    <Content>
      <Grid item sx={12}>
        <CustomLoader isLoading={isLoading} />
      </Grid>
      {getModal(selected, open, handleClose, onDelete)}
      <CustomError error={errorMessage} />
      <Grid item xs={12}>
        <AssignmentForm
          assignmentValues={assignmentValues}
          places={availablePlaces}
          users={availableUsers}
          onChange={(event) => onAssignmentChange(event)}
          onSubmit={(event) => onSubmit(event)}
          isLoading={loadingSave}
        />
      </Grid>
      <AssignmentsForUpdateTable
        assignments={assignments.people}
        handleOpenModal={(id, user, place) => handleClickOpen(id, user, place)}
      />
    </Content>
  );
};

AssignmentsUpdatesPage.propTypes = {
  firebase: PropTypes.any.isRequired,
};

export default compose(
  withAuthorization(conditions.isAdminUser),
  withFirebase,
)(AssignmentsUpdatesPage);
