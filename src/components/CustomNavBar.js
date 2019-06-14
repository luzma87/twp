import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppBar from '@material-ui/core/AppBar';
import Button from "@material-ui/core/Button";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import React from 'react';
import { withContext } from "../context/WithContext";

const CustomNavBar = (props) => {
  const {context} = props;
  const {getUser} = context;
  const {email} = getUser();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" style={{flex: 1}}>
          TWP
        </Typography>

        <Typography color="inherit" style={{flex: 1}}>
          {email}
        </Typography>
        <Button color="inherit" onClick={() => context.logout()}>
          Logout
          <FontAwesomeIcon icon={['far', 'sign-out-alt']} style={{marginLeft: 16}} />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

CustomNavBar.propTypes = {
  context: PropTypes.any.isRequired,
};

export default withContext(CustomNavBar);
