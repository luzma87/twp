import constants from '../constants/constants';
import User from './User';

class Users {
  constructor(usersObject) {
    this.list = [];
    if (usersObject) {
      this.list = Object.values(usersObject).map((u) => new User(u));
    }
  }

  getSorted(activeOnly) {
    if (activeOnly) {
      return this.getActive().sort(constants.userSort);
    }
    return this.list.sort(constants.userSort);
  }

  getActive() {
    return this.list.filter((u) => u.isActive);
  }
}

export default Users;
