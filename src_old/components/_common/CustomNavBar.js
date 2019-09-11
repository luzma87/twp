import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { withContext } from '../../context/WithContext';
import routes from '../../routes';
import NavBarIcon from './NavBarIcon';

const CustomNavBar = (props) => {
  const { context } = props;
  const { getUser } = context;
  const { email, displayName } = getUser();
  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <div className="navbar-part">
          <Typography variant="h6" color="inherit" style={{ marginRight: 8 }}>
            <Link to={routes.home()} style={{ color: 'white', textDecoration: 'none' }}>
              TWP
            </Link>
          </Typography>
          <NavBarIcon title="Personas" icon="user-astronaut" to={routes.personList()} />
          <NavBarIcon title="Puestos" icon="warehouse" to={routes.buildingList()} />
          <NavBarIcon title="Asignaciones" icon="rocket" to={routes.assignments()} />
        </div>

        <div className="navbar-part">
          <Typography color="inherit" style={{ marginRight: 8 }}>
            {displayName || email}
          </Typography>
          <Button color="inherit" onClick={() => context.logout()}>
            Logout
            <FontAwesomeIcon icon={['far', 'sign-out-alt']} style={{ marginLeft: 8 }} />
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

CustomNavBar.propTypes = {
  context: PropTypes.any.isRequired,
};

export default withContext(CustomNavBar);
