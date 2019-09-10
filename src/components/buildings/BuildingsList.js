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

const buildingsBody = (values) => {
  if (values.buildings === null) {
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
        Object.values(values.buildings).map((building) => {
          const places = Object.values(building.places);
          return (
            <TableRow key={building.id}>
              <TableCell>
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

const buildingsTable = (values) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Nombre</TableCell>
        <TableCell>Dirección</TableCell>
        <TableCell>Observaciones</TableCell>
        <TableCell>Puestos</TableCell>
      </TableRow>
    </TableHead>
    {buildingsBody(values)}
  </Table>
);

const BuildingsList = ({ context }) => {
  const [values, setValues] = React.useState({
    buildings: {},
  });
  const { getActiveBuildings } = context;
  getActiveBuildings().then((snapshot) => {
    setValues({ ...values, buildings: snapshot.val() });
  });

  return (
    <Content>
      <CreateButton linkTo={routes.buildingForm()} />
      <Paper>
        {buildingsTable(values)}
      </Paper>
    </Content>
  );
};

BuildingsList.propTypes = {
  context: PropTypes.any.isRequired,
};

BuildingsList.defaultProps = {};

export default withContext(BuildingsList);
