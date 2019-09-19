import { ceil, flatten } from 'lodash';
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
          building: {
            id: building.id,
            name: building.name,
            address: building.address,
          },
          owners: {},
        };
      }
      if (!buildingsOwnersMap[building.id].owners[owner]) {
        buildingsOwnersMap[building.id].owners[owner] = [];
      }
      buildingsOwnersMap[building.id].owners[owner].push(place);
    });
    let ownersList = [];
    Object.values(buildingsOwnersMap).forEach((element) => {
      const { owners, building } = element;
      const x = Object.keys(owners).map((owner) => {
        const places = owners[owner];
        const totalOwner = places.reduce((total, place) => total + place.price, 0);
        let { ownerInfo, ownerPayment } = places[0];
        if (!ownerInfo) ownerInfo = '';
        if (!ownerPayment) ownerPayment = '';
        return {
          owner,
          ownerInfo,
          ownerPayment,
          places,
          building,
          total: totalOwner,
          payed: '',
        };
      });
      ownersList.push(x);
    });
    ownersList = flatten(ownersList);
    return ownersList.reduce((acc, owner, index) => {
      const id = `owner_${index}`;
      acc[id] = { ...owner, id };
      return acc;
    }, {});
  }

  getListForEmail(paramsObject) {
    let otherBanks = 0;
    let placePriceTotal = 0;
    let assignedUsers = 0;

    this.users.forEach((user) => {
      if (user.place) {
        assignedUsers += 1;
        if (user.bank.value !== paramsObject.defaultBank) {
          otherBanks += parseFloat(paramsObject.differentBank);
        }
        const userBuilding = this.buildings[user.place.building];
        if (userBuilding) {
          const userPlace = userBuilding.places[user.place.place];
          placePriceTotal += parseFloat(userPlace.price);
        }
      }
    });

    const totalValue = placePriceTotal + otherBanks + parseFloat(paramsObject.hosting);
    const valuePerPerson = ceil(totalValue / assignedUsers, 1);

    const map = {};
    this.assignments.sort(constants.assignmentSortByUser).forEach((element) => {
      map[element.user.uid] = {
        user: element.user.name,
        place: element.building.getPlaceString(element.placeId),
      };
    });

    return {
      people: map,
      valuePerPerson,
    };
  }
}

export default Assignments;
