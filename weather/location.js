class Location {
  constructor(formattedAddress, country) {
    this.address = formattedAddress;
    this.country = country.toLowerCase();
  }
}

module.exports = Location;
