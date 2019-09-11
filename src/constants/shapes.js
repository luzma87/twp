import PropTypes from 'prop-types';

const user = {
  uid: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  roles: PropTypes.shape({}).isRequired,
};

const shapes = {
  user,
};

export default shapes;
