class Building {
  constructor(buildingObj) {
    this.id = buildingObj.id;
    this.name = buildingObj.name;
    this.address = buildingObj.address;
    this.coords = buildingObj.coords;
    this.observations = buildingObj.observations;
    this.places = buildingObj.places;
    this.active = buildingObj.active;
  }

  static fromDbList(list) {
    return list.map((u) => new Building(u));
  }

  getPlaceString(placeId) {
    const place = this.places[placeId];
    return `${this.name} #${place.number}`;
  }
}

export default Building;
