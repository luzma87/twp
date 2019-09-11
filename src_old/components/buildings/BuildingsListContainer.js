import React from 'react';
import PropTypes from 'prop-types';
import { withContext } from '../../context/WithContext';
import BuildingsList from './BuildingsList';

const BuildingsListContainer = ({ context }) => {
  const { buildings, getAllBuildings } =  context ;
  if(buildings.length === 0) getAllBuildings();
  return (
    <BuildingsList buildings={buildings} />
  );
};

BuildingsListContainer.propTypes = {
  context: PropTypes.any.isRequired,
};

BuildingsListContainer.defaultProps = {};

export default withContext(BuildingsListContainer);
