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
import Content from '../_common/Content';
import CustomLoader from '../_common/CustomLoader';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';
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

const AssignmentsUpdatesPage = ({ firebase }) => {
  const [loadingUserPayments, setLoadingUserPayments] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [date] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setLoadingUserPayments(true);
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
    };
  }, [firebase, date]);

  const handleClickOpen = (id, user, place) => {
    setSelected({ id, user, place });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    const ref = firebase.userPayment(`${getCurrentPaymentsId(date)}/assignments/people/${selected.id}`);
    ref.remove();

    handleClose();
  };

  return (
    <Content>
      <Grid item sx={12}>
        <CustomLoader isLoading={loadingUserPayments} />
      </Grid>
      {getModal(selected, open, handleClose, handleDelete)}
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
