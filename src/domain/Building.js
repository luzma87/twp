import numeral from 'numeral';
import constants from '../constants/constants';

class Building {
  constructor(buildingObj) {
    this.id = buildingObj.id;
    this.name = buildingObj.name;
    this.address = buildingObj.address;
    this.coords = buildingObj.coords;
    this.observations = buildingObj.observations;
    this.places = buildingObj.places;
    this.isActive = buildingObj.isActive;
  }

  static fromDbList(list) {
    return list.map((u) => new Building(u));
  }

  getPlaceString(placeId) {
    const place = this.places[placeId];
    return `${this.name} #${place.number} (${place.owner})`;
  }

  // eslint-disable-next-line class-methods-use-this
  getPlaceInfo(place) {
    return `#${place.number}, ${constants.carSizeLabel(place.size)}, ${numeral(place.price).format('$0,0.00')}, ${place.owner}`;
  }
}

export default Building;
