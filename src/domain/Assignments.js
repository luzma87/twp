import { flatten } from 'lodash';
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

  getListForPayments() {
    const buildingsOwnersMap = {};
    this.assignments.forEach((assignment) => {
      const { building, placeId } = assignment;
      const place = building.places[placeId];
      const { owner } = place;
      if (!buildingsOwnersMap[building.id]) {
        buildingsOwnersMap[building.id] = {
          building,
          owners: {},
        };
      }
      if (!buildingsOwnersMap[building.id].owners[owner]) {
        buildingsOwnersMap[building.id].owners[owner] = [];
      }
      buildingsOwnersMap[building.id].owners[owner].push(place);
    });
    const ownersList = [];
    Object.values(buildingsOwnersMap).forEach((element) => {
      const { owners, building } = element;
      const x = Object.keys(owners).map((owner) => {
        const places = owners[owner];
        const totalOwner = places.reduce((total, place) => total + place.price, 0);
        return {
          owner, places, building, total: totalOwner,
        };
      });
      ownersList.push(x);
    });
    let sortedOwnersList = flatten(ownersList);
    sortedOwnersList = sortedOwnersList.sort((a, b) => {
      if (a.building.name < b.building.name) {
        return -1;
      }
      if (a.building.name > b.building.name) {
        return 1;
      }
      return 0;
    });
    return sortedOwnersList;
  }
}

export default Assignments;
