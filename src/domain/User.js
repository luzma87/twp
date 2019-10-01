import roles from '../constants/roles';

class User {
  constructor(userObj) {
    this.uid = userObj.uid;
    this.email = userObj.email;
    this.name = userObj.name;
    this.id = userObj.id;
    this.bank = userObj.bank;
    this.isAdmin = userObj.isAdmin;
    this.isActive = userObj.isActive;
    this.parkingMeteors = userObj.parkingMeteors;
    this.parkingDifficulty = userObj.parkingDifficulty;
    this.roles = userObj.roles;
    this.car = userObj.car;
  }

  getCarString() {
    const { car } = this;
    if (car) {
      return `${car.brand} ${car.model} [${car.plate.toUpperCase()}]`;
    }
    return '';
  }

  getIsAdmin() {
    if (this.roles) {
      return this.roles[roles.ADMIN] === roles.ADMIN;
    }
    return this.isAdmin;
  }
}

export default User;
