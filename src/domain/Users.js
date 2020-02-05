import constants from '../constants/constants';
import User from './User';

class Users {
  constructor(usersObject) {
    this.list = [];
    this.cars = [];
    this.bikes = [];
    if (usersObject) {
      this.list = Object.values(usersObject).map((u) => new User(u));
      this.cars = this.list.filter((u) => !u.hasBike);
      this.bikes = this.list.filter((u) => u.hasBike);
    }
  }

  getTotalCount() {
    return this.cars.length;
  }

  getSorted(activeOnly) {
    if (activeOnly) {
      return this.getActive().sort(constants.userSort);
    }
    return this.cars.sort(constants.userSort);
  }

  getActive() {
    return this.cars.filter((u) => u.isActive);
  }

  getTotalBikeCount() {
    return this.bikes.length;
  }

  getSortedBikes(activeOnly) {
    if (activeOnly) {
      return this.getActiveBikes().sort(constants.userSort);
    }
    return this.bikes.sort(constants.userSort);
  }

  getActiveBikes() {
    return this.bikes.filter((u) => u.isActive);
  }
}

export default Users;
