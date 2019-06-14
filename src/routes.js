
const routes = {
  login: () => '/login',
  personPayments: (personId = ':personId') => `/people/${personId}/payments`,
  personCarForm: (personId = ':personId', carId = ':carId') => `/people/${personId}/cars/${carId}/form`,
  personForm: (personId = ':personId') => `/people/${personId}/form`,
  personList: () => '/people',
  buildingPlaceForm: (buildingId = ':buildingId', placeId = ':placeId') => `/buildings/${buildingId}/places/form/${placeId}`,
  buildingForm: (buildingId = ':buildingId') => `/buildings/${buildingId}/form`,
  buildingList: () => '/buildings',
  assign: () => '/assign',
  checkPayments: () => '/checkPayments',
  home: () => '/',
};


export default routes;
