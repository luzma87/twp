import PropTypes from 'prop-types';

const car = {
  brand: PropTypes.string,
  model: PropTypes.string,
  plate: PropTypes.string,
  size: PropTypes.shape({}),
};

const user = {
  uid: PropTypes.string,
  email: PropTypes.string,
  name: PropTypes.string,
  passwordOne: PropTypes.string,
  passwordTwo: PropTypes.string,
  isAdmin: PropTypes.bool,
  id: PropTypes.string,
  bank: PropTypes.shape({}),
  isActive: PropTypes.bool,
  parkingMeteors: PropTypes.number,
  roles: PropTypes.shape({}),
  car: PropTypes.shape(car),
};

const shapes = {
  user,
  car,
};

export default shapes;
