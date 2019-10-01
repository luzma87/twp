import {
  Paper, Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import ActiveIndicator from '../_common/ActiveIndicator';
import MeteorRating from '../_common/meteorRating/MeteorRating';

const BuildingsTable = ({ list }) => (
  <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Nombre</TableCell>
          <TableCell>Dirección</TableCell>
          <TableCell>Observaciones</TableCell>
          <TableCell>Puestos</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
            list.map((building, index) => {
              const places = Object.values(building.places);
              return (
                <TableRow key={building.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <ActiveIndicator isActive={building.isActive} icon="warehouse" />
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
                        <ActiveIndicator isActive={place.isActive} icon="draw-square" />
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
);

BuildingsTable.propTypes = {
  list: PropTypes.any,
};

BuildingsTable.defaultProps = {
  list: [],
};

export default BuildingsTable;
