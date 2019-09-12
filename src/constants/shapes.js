import PropTypes from 'prop-types';

const constantProp = {
  value: PropTypes.string,
  label: PropTypes.string,
};

const car = {
  brand: PropTypes.string,
  model: PropTypes.string,
  plate: PropTypes.string,
  size: PropTypes.shape(constantProp),
};

const user = {
  uid: PropTypes.string,
  email: PropTypes.string,
  name: PropTypes.string,
  passwordOne: PropTypes.string,
  passwordTwo: PropTypes.string,
  isAdmin: PropTypes.bool,
  id: PropTypes.string,
  bank: PropTypes.shape(constantProp),
  isActive: PropTypes.bool,
  parkingMeteors: PropTypes.number,
  roles: PropTypes.shape({}),
  car: PropTypes.shape(car),
};

const place = {
  size: PropTypes.shape(constantProp),
  number: PropTypes.string,
  price: PropTypes.number,
  active: PropTypes.bool,
  owner: PropTypes.string,
  difficulty: PropTypes.number,
  paymentInformation: PropTypes.string,
};

const building = {
  id: PropTypes.string,
  name: PropTypes.string,
  address: PropTypes.string,
  coords: PropTypes.shape({ lat: PropTypes.number, long: PropTypes.number }),
  observations: PropTypes.string,
  places: PropTypes.shape({}),
  active: PropTypes.bool,
};

const assignment = {
  user: PropTypes.string,
  place: PropTypes.shape({ building: PropTypes.string, place: PropTypes.string }),
  id: PropTypes.string,
};

const shapes = {
  user,
  car,
  building,
  place,
  assignment,
};

export default shapes;
