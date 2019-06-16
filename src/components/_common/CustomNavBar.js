import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppBar from '@material-ui/core/AppBar';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import React from 'react';
import { withContext } from "../../context/WithContext";
import routes from "../../routes";

const CustomNavBar = (props) => {
  const {context} = props;
  const {getUser} = context;
  const {email, displayName} = getUser();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" style={{flex: 1}}>
          <Link to={routes.home()} style={{color: 'white', textDecoration: 'none'}}>
            TWP
          </Link>
        </Typography>

        <Link to={routes.personList()} style={{color: 'white'}}>
          <IconButton aria-label="Show 4 new mails" color="inherit">
            <FontAwesomeIcon icon={['far', 'user-astronaut']}/>
            <FontAwesomeIcon icon={['far', 'rocket']} style={{marginLeft: 8}}/>
          </IconButton>
        </Link>

        <Typography color="inherit" style={{flex: 1}}>
          {displayName ? displayName : email}
        </Typography>
        <Button color="inherit" onClick={() => context.logout()}>
          Logout
          <FontAwesomeIcon icon={['far', 'sign-out-alt']} style={{marginLeft: 8}} />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

CustomNavBar.propTypes = {
  context: PropTypes.any.isRequired,
};

export default withContext(CustomNavBar);
