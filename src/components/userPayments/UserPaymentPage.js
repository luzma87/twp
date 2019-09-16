import { Container } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import shapes from '../../constants/shapes';
import Content from '../_common/Content';
import withAuthorization from '../session/withAuthorization';

const UserPaymentPage = ({ authUser, firebase }) => {
  const a = '';
  return (
    <Content>
      Mis pagos
    </Content>
  );
};

UserPaymentPage.propTypes = {
  authUser: PropTypes.shape(shapes.user).isRequired,
  firebase: PropTypes.any.isRequired,
};

export default compose(
  withAuthorization(conditions.isLoggedUser),
)(UserPaymentPage);
