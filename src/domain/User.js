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
    this.roles = userObj.roles;
    this.car = userObj.car;
  }

  static fromDbList(list) {
    return list.map((u) => new User(u));
  }

  getCarString() {
    const { car } = this;
    return `${car.brand} ${car.model} [${car.plate}]`;
  }
}

export default User;
