import PropTypes from 'prop-types';

const user = {
  uid: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  username: PropTypes.string,
  roles: PropTypes.shape({}),
};

const shapes = {
  user,
};

export default shapes;
