import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import MeteorRating from "../_common/meteorRating/MeteorRating";

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
              Object.values(values.buildings).map(building => (
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
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Paper>
    </Content>
  );
};

BuildingsList.propTypes = {
  context: PropTypes.any.isRequired,
};

BuildingsList.defaultProps = {};

export default withContext(BuildingsList);
