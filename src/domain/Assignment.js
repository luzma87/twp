import Building from './Building';
import User from './User';

class Assignment {
  constructor(user, building, placeId) {
    this.user = new User(user);
    this.building = new Building(building);
    this.placeId = placeId;
  }
}

export default Assignment;
