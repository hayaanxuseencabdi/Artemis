class Location {
  constructor(formattedAddress = "", countryAbbreviation = "",
              longitude = "", latitude = "") {
    this.formattedAddress = formattedAddress;
    this.countryAbbreviation = countryAbbreviation.toLowerCase();
    this.longitude = Number.parseFloat(longitude).toFixed(2);
    this.latitude = Number.parseFloat(latitude).toFixed(2);
  }

  toString() {
    return `**${this.formattedAddress}** :flag_${this.countryAbbreviation}:\n`;
  }
}

module.exports = Location;
