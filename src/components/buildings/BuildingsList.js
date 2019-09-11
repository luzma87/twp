import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import React from 'react';
import { withContext } from '../../context/WithContext';
import routes from '../../routes';
import Content from '../_common/Content';
import CreateButton from '../_common/CreateButton';

const buildingsBody = (buildings) => {
  if (buildings === null) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={4} align="center">
            <span style={{ color: '#aabbcc', fontWeight: 'bold' }}>
              No hay nada aquí
            </span>
            <FontAwesomeIcon
              icon={['far', 'ghost']}
              style={{ marginLeft: 8 }}
              size="2x"
              color="#aabbcc"
            />
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
  return (
    <TableBody>
      {
        Object.values(buildings).map((building) => {
          const places = Object.values(building.places);
          return (
            <TableRow key={building.id}>
              <TableCell>
                <FontAwesomeIcon
                  icon={['far', 'warehouse']}
                  style={{ marginRight: 8, color: building.active ? '#2E7D32' : '#B71C1C' }}
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
                      style={{ marginRight: 8, color: place.active ? '#2E7D32' : '#B71C1C' }}
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
  );
};

const buildingsTable = (buildings) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Nombre</TableCell>
        <TableCell>Dirección</TableCell>
        <TableCell>Observaciones</TableCell>
        <TableCell>Puestos</TableCell>
      </TableRow>
    </TableHead>
    {buildingsBody(buildings)}
  </Table>
);

const BuildingsList = ({ buildings }) => {
  console.log('aqui');
  return (
    <Content>
      <CreateButton linkTo={routes.buildingForm()} />
      <Paper>
        {buildingsTable(buildings)}
      </Paper>
    </Content>
  );
};

BuildingsList.propTypes = {
  buildings: PropTypes.any,
};

BuildingsList.defaultProps = {
  buildings: [],
};

export default BuildingsList;
