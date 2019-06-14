import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { withContext } from '../context/WithContext';
import routes from '../routes';

const Home = (props) => {
  const { context } = props;
  const { getUser } = context;
  const { email } = getUser();
  const routeNames = Object.keys(routes);
  return (
    <div>
      {`Logged In as ${email}`}
      <br />
      <br />
      {routeNames.map(routeName => (
        <div key={routeName}>
          <Link to={routes[routeName]()}>{routeName}</Link>
        </div>
      ))}
      <br />
      <br />
      <button
        onClick={() => context.logout()}
        type="button"
      >
        Logout
      </button>
    </div>
  );
};

Home.propTypes = {
  context: PropTypes.any.isRequired,
};

Home.defaultProps = {};

export default withContext(Home);
