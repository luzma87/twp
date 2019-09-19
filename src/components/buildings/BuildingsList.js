import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import Buildings from '../../domain/Buildings';
import MeteorRating from '../_common/meteorRating/MeteorRating';

const BuildingsList = ({ buildings, activeOnly }) => {
  if (!(buildings instanceof Buildings)) {
    return null;
  }
  const list = buildings.getSorted(activeOnly);
  const activeMessage = activeOnly ? 'sólo activos' : 'todos';
  return (
    <>
      <Typography style={{ marginBottom: 16 }}>
        {`Mostrando ${list.length} edificios (${activeMessage})`}
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Observaciones</TableCell>
              <TableCell>Puestos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              list.map((building) => {
                const places = Object.values(building.places);
                return (
                  <TableRow key={building.id}>
                    <TableCell>
                      <FontAwesomeIcon
                        icon={['far', 'warehouse']}
                        style={{ marginRight: 8, color: building.isActive ? '#2E7D32' : '#B71C1C' }}
                      />
                      <Link to={`${routes.BUILDINGS_EDIT_ID}${building.id}`} style={{ color: 'black' }}>
                        {building.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {building.address}
                    </TableCell>
                    <TableCell>
                      {building.observations}
                    </TableCell>
                    <TableCell>
                      {places.map((place) => (
                        <div key={place.id}>
                          <FontAwesomeIcon
                            icon={['far', 'draw-square']}
                            style={{ marginRight: 8, color: place.isActive ? '#2E7D32' : '#B71C1C' }}
                          />
                          {`${building.getPlaceInfo(place)}, `}
                          <MeteorRating id="placeDifficulty" value={place.difficulty} compact />
                        </div>
                      ))}
                    </TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

BuildingsList.propTypes = {
  buildings: PropTypes.any,
  activeOnly: PropTypes.bool,
};

BuildingsList.defaultProps = {
  buildings: [],
  activeOnly: true,
};

export default BuildingsList;
