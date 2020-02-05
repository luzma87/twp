import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Paper, Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import { withTheme } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import CustomHighlighter from '../_common/CustomHighlighter';

const getIcon = (person, theme) => {
  const color = person.isActive ? theme.palette.active[500] : theme.palette.inactive[500];
  if (person.bikeType === 'bike') {
    return <FontAwesomeIcon color={color} icon={['far', 'bicycle']} style={{ marginRight: 4 }} />;
  }
  return <FontAwesomeIcon color={color} icon={['fas', 'motorcycle']} style={{ marginRight: 4 }} />;
};

const BikesTable = ({ list, textFilter, theme }) => (
  <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Nombre</TableCell>
          <TableCell>E-mail</TableCell>
          <TableCell>Cédula</TableCell>
          <TableCell>Tiene</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {list.map((person, index) => (
          <TableRow key={person.uid}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              {getIcon(person, theme)}
              <Link to={`${routes.BIKES_EDIT_ID}${person.uid}`} style={{ color: 'black' }}>
                <CustomHighlighter filter={[textFilter]} text={person.name} />
              </Link>
            </TableCell>
            <TableCell>
              <CustomHighlighter filter={[textFilter]} text={person.email} />
            </TableCell>
            <TableCell>
              {person.id}
            </TableCell>
            <TableCell>
              {person.getElements()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

BikesTable.propTypes = {
  list: PropTypes.any,
  textFilter: PropTypes.any,
  theme: PropTypes.any.isRequired,
};

BikesTable.defaultProps = {
  list: [],
  textFilter: '',
};

export default withTheme(BikesTable);
