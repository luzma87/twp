import React from 'react';
import PropTypes from 'prop-types';
import Content from '../_common/Content';

const BuildingPlaceForm = props => (
  <Content>
      Building place form
  </Content>
);

BuildingPlaceForm.propTypes = {
  match: PropTypes.object.isRequired,
  context: PropTypes.any.isRequired,
};

BuildingPlaceForm.defaultProps = {};

export default BuildingPlaceForm;
