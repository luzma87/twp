import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { withContext } from '../context/WithContext';
import routes from '../routes';
import Content from "./_common/Content";
import CustomNavBar from "./CustomNavBar";

const Home = (props) => {
  const { context } = props;
  const { getUser } = context;
  const { email } = getUser();
  const routeNames = Object.keys(routes);
  return (
    <div>
      <CustomNavBar/>
      <Content>
      {`Logged In as ${email}`}
      <br />
      <br />
      <ul>
      {routeNames.map(routeName => (
        <li key={routeName}>
          <Link to={routes[routeName]()}>{routeName}</Link>
        </li>
      ))}
      </ul>
      <br />
      <br />
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => context.logout()}
      >
        Logout
        <FontAwesomeIcon icon={['far', 'sign-out-alt']} style={{ marginLeft: 16 }} />
      </Button>
      </Content>
    </div>
  );
};

Home.propTypes = {
  context: PropTypes.any.isRequired,
};

Home.defaultProps = {};

export default withContext(Home);
