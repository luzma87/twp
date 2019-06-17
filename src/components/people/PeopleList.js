import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import PropTypes from "prop-types";
import React from 'react';
import { Link } from "react-router-dom";
import { withContext } from "../../context/WithContext";
import routes from "../../routes";
import Content from "../_common/Content";

const PeopleList = ({context}) => {
  const {getActivePeople} = context;
  getActivePeople().then((snapshot) => {
    console.log(snapshot.val());
  })
  return (
    <Content>
      <Link to={routes.personForm()} style={{textDecoration: 'none'}}>
        <Button>
          <FontAwesomeIcon icon={['far', 'plus-hexagon']} style={{marginRight: 8}} />
          New person
        </Button>
      </Link>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Admin?</TableCell>
              <TableCell>Cédula</TableCell>
              <TableCell>Auto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

          </TableBody>
        </Table>
      </Paper>

    </Content>
  );
};

PeopleList.propTypes = {
  context: PropTypes.any.isRequired
};

PeopleList.defaultProps = {};

export default withContext(PeopleList);
