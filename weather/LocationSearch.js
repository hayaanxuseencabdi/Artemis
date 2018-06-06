const fetch = require("node-fetch");
const helper = require("../HelperFunctions");
const config = require("../config.json");
const Location = require("./Location");


module.exports = {
  returnCoordinates: (message, query) => {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${helper.transformToQuery(query)}&key=${config.geocodingAPI}`)
    .then((info) => info.json()) 
    .then((infoJSON) => {
      if (infoJSON.status !== "OK") {
        console.log("not OK");
        message.channel.send(JSON.stringify(infoJSON), null, 2);
        message.channel.send(`${query} not found.`);
        return;
      }
      const info = infoJSON.results[0].address_components;
      const address = infoJSON.results[0].formatted_address;
      const symbol = (info[info.length - 1].types[0] === "postal_code") ? info[info.length - 2].short_name.toLowerCase() : info[info.length - 1].short_name.toLowerCase();
      const coordinates = [infoJSON.results[0].geometry.location.lng, infoJSON.results[0].geometry.location.lat];
      return new Location(address, symbol, coordinates[0], coordinates[1]);
    })
    .catch((error) => {
      message.channel.send(`Couldn't find ${query}`, error);
    });
  },
}
