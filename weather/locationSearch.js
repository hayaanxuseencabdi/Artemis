const fetch = require("node-fetch");
const helper = require("../helperFunctions.js");
const config = require("../config.json");
const Location = require("./location.js");


module.exports = {
  returnCoordinates: (message, query) => {
    const geocodingQuery = `https://maps.googleapis.com/maps/api/geocode/json?address=${helper.transformToQuery(query)}&key=${config.geocodingAPI}`;
    fetch(geocodingQuery)
    .then((info) => info.json()) 
    .then((infoJSON) => {
      if (infoJSON.status !== "OK") {
        message.channel.send(`${query} not found.`);
        return;
      }
      const info = infoJSON.results[0].address_components;
      const address = infoJSON.results[0].formatted_address;
      const symbol = (info[info.length - 1].types[0] === "postal_code") ? info[info.length - 2].short_name.toLowerCase() : info[info.length - 1].short_name.toLowerCase();
      const coordinates = [infoJSON.results[0].geometry.location.lng, infoJSON.results[0].geometry.location.lat];
      const location = new Location(address, symbol, coordinates[0], coordinates[1]);
      message.channel.send(location.toString());
    })
    .catch((error) => {
      message.channel.send(error);
    });
  },
}
