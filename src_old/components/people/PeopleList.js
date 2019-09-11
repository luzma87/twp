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
import MeteorRating from '../_common/meteorRating/MeteorRating';

const PeopleList = ({ context }) => {
  const [values, setValues] = React.useState({
    people: {},
  });
  const { getAllPeople } = context;
  getAllPeople().then((snapshot) => {
    setValues({ ...values, people: snapshot.val() });
  });
  return (
    <Content>
      <CreateButton linkTo={routes.personForm()} />

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Admin?</TableCell>
              <TableCell>Cédula</TableCell>
              <TableCell>Parking</TableCell>
              <TableCell>Auto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              Object.values(values.people).map((person) => (
                <TableRow key={person.id}>
                  <TableCell>
                    <FontAwesomeIcon
                      icon={['far', 'user-astronaut']}
                      style={{ marginRight: 8, color: person.active ? '#2E7D32' : '#B71C1C' }}
                    />
                    {person.name}
                  </TableCell>
                  <TableCell>
                    {person.email}
                  </TableCell>
                  <TableCell>
                    {person.admin ? (
                      <FontAwesomeIcon
                        icon={['far', 'alicorn']}
                        size="2x"
                      />
                    ) : null}
                  </TableCell>
                  <TableCell>
                    {person.id}
                  </TableCell>
                  <TableCell>
                    <MeteorRating value={person.parkingMeteors} size="lg" readonly />
                  </TableCell>
                  <TableCell>
                    {`${person.car.brand} ${person.car.model}`}
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

PeopleList.propTypes = {
  context: PropTypes.any.isRequired,
};

PeopleList.defaultProps = {};

export default withContext(PeopleList);
