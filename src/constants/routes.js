const routes = {
  HOME: '/',
  SIGN_IN: '/signin',
  ACCOUNT: '/account',
  PASSWORD_FORGET: '/pw-forget',
  PARAMS: '/params',
  ASSIGNMENT_EMAIL: '/email',
  SHAME_EMAIL: '/reminderEmail',

  USERS: '/users',
  USERS_CREATE: '/users/create',
  USERS_EDIT: '/users/edit/:id',
  USERS_EDIT_ID: '/users/edit/',

  BUILDINGS: '/buildings',
  BUILDINGS_CREATE: '/buildings/create',
  BUILDINGS_EDIT: '/buildings/edit/:id',
  BUILDINGS_EDIT_ID: '/buildings/edit/',

  ASSIGNMENTS: '/assignments',
  USER_ASSIGNMENTS: '/userAssignments',
  ASSIGNMENTS_CREATE: '/assignments/create',

  PAYMENTS: '/payments',

  USER_PAYMENT: '/myPayments',
  ALL_USERS_PAYMENTS: '/userPayments',
};

export default routes;
