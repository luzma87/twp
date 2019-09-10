
const routes = {
  login: () => '/login',
  personPayments: (personId = ':personId') => `/people/${personId}/payments`,
  personForm: (personId = ':personId') => `/people/${personId}/form`,
  personList: () => '/people',
  buildingForm: (buildingId = ':buildingId') => `/buildings/${buildingId}/form`,
  buildingList: () => '/buildings',
  assignments: () => '/assignments',
  checkPayments: () => '/checkPayments',
  home: () => '/',
};


export default routes;
