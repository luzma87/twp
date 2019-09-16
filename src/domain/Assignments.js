import constants from '../constants/constants';
import Assignment from './Assignment';

const placeExists = (user) => user.place !== undefined;
const buildingExists = (user, buildings) => placeExists(user)
  && buildings.indexOf(user.place.building) !== -1;

class Assignments {
  constructor(usersList, buildingsObject) {
    this.users = usersList;
    this.buildings = buildingsObject;

    const existingBuildings = Object.keys(buildingsObject);
    const filteredList = usersList.filter((u) => buildingExists(u, existingBuildings));

    this.assignments = filteredList.map((user) => {
      const { place: { building: buildingId, place: placeId } } = user;
      const building = buildingsObject[buildingId];
      return new Assignment(user, building, placeId);
    });
  }

  sortedByUser(buildingFilter) {
    let filteredList = this.assignments;
    if (buildingFilter && buildingFilter !== '-1') {
      filteredList = this.assignments.filter((a) => a.building.id === buildingFilter);
    }
    return filteredList.sort(constants.assignmentSortByUser);
  }
}

export default Assignments;
