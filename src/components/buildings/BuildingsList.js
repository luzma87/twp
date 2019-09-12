import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import PropTypes from 'prop-types';
import MeteorRating from '../_common/meteorRating/MeteorRating';

const BuildingsList = ({ buildings }) => (
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
            Object.values(buildings).map((building) => {
              const places = Object.values(building.places);
              return (
                <TableRow key={building.id}>
                  <TableCell>
                    <FontAwesomeIcon
                      icon={['far', 'warehouse']}
                      style={{ marginRight: 8, color: building.isActive ? '#2E7D32' : '#B71C1C' }}
                    />
                    {building.name}
                  </TableCell>
                  <TableCell>
                    {building.address}
                  </TableCell>
                  <TableCell>
                    {building.observations}
                  </TableCell>
                  <TableCell>
                    {places.map((place) => (
                      <div key={place.number}>
                        <FontAwesomeIcon
                          icon={['far', 'draw-square']}
                          style={{ marginRight: 8, color: place.isActive ? '#2E7D32' : '#B71C1C' }}
                        />
                        {`#${place.number}, ${place.size.label}, $${place.price}, `}
                        <span className="full-meteor">
                          {`${place.difficulty} `}
                        </span>
                        <FontAwesomeIcon icon={['fas', 'meteor']} className="full-meteor" />
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
);

BuildingsList.propTypes = {};

BuildingsList.defaultProps = {};

export default BuildingsList;
