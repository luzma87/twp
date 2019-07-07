import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import routes from '../../routes';
import Content from '../_common/Content';
import CreateButton from '../_common/CreateButton';

const BuildingsList = () => (
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
        <TableBody />
      </Table>
    </Paper>
  </Content>
);

BuildingsList.propTypes = {};

BuildingsList.defaultProps = {};

export default BuildingsList;
