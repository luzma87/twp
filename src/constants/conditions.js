import roles from './roles';

const isLoggedUser = (authUser) => !!authUser;

const isAdminUser = (authUser) => authUser && !!authUser.roles[roles.ADMIN];

const conditions = {
  isLoggedUser,
  isAdminUser,
};

export default conditions;
