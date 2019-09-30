import constants from '../constants/constants';
import Building from './Building';

class Buildings {
  constructor(buildingsObject) {
    this.list = [];
    if (buildingsObject) {
      this.list = Object.values(buildingsObject).map((u) => new Building(u));
    }
  }

  getTotalCount() {
    return this.list.length;
  }

  getSorted(activeOnly) {
    if (activeOnly) {
      return this.getActive().sort(constants.userSort);
    }
    return this.list.sort(constants.userSort);
  }

  getActive() {
    return this.list.filter((u) => u.isActive || u.active);
  }
}

export default Buildings;
