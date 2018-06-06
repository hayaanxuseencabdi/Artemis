class Location {
  constructor(formattedAddress = "", countryAbbreviation = "",
              longitude = "", latitude = "") {
    this.formattedAddress = formattedAddress;
    this.countryAbbreviation = countryAbbreviation.toLowerCase();
    this.longitude = Number.parseFloat(longitude);
    this.latitude = Number.parseFloat(latitude);
  }

  toString() {
    return `**${this.formattedAddress}** :flag_${this.countryAbbreviation}:\n`;
  }
}

module.exports = Location;
