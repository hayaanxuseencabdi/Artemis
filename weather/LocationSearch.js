const fetch = require("node-fetch");
const HelperFunctions = require("../HelperFunctions");
const Location = require("./Location");

const BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json?address="

module.exports = {
  returnCoordinates: (query) => {
    return fetch(
      encodeURI(
      `${BASE_URL}${HelperFunctions.transformToQuery(query)}&key=${process.env.GEOCODING}`
      )
    )
      .then((info) => info.json())
      .then((infoJSON) => {
        const info = infoJSON.results[0].address_components;
        const address = infoJSON.results[0].formatted_address;

        const symbol = (info[info.length - 1].types[0] === "postal_code") ?
                        info[info.length - 2].short_name.toLowerCase() :
                        info[info.length - 1].short_name.toLowerCase();
        const coordinates = [infoJSON.results[0].geometry.location.lng,
                             infoJSON.results[0].geometry.location.lat];
        return new Location(address, symbol, coordinates[0], coordinates[1]);
      })
      .catch((error) => {
        console.log(`Couldn't find ${query}`, error);
      });
  },
}
