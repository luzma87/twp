import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';

const AdminPage = (props) => (
  <div>Admin</div>
);

AdminPage.propTypes = {
  firebase: PropTypes.any.isRequired,
};

export default compose(
  withAuthorization(conditions.isAdminUser),
  withFirebase,
)(AdminPage);
