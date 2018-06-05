const fetch = require("node-fetch");
const helper = require("../helperFunctions.js");
const config = require("../config.json");


module.exports = {
  returnCoordinates: (message, location) => {
    const geocodingQuery = `https://maps.googleapis.com/maps/api/geocode/json?address=${helper.transformToQuery(location)}&key=${config.geocodingAPI}`;
    fetch(geocodingQuery)
    .then((info) => info.json()) 
    .then((infoJSON) => {
      if (infoJSON.status !== "OK") {
        message.channel.send();
        return;
      }
    const info = infoJSON.results[0].address_components;
    let city, region, country, countryAbbreviation;
    message.channel.send(JSON.stringify(info, null, 2));
    message.channel.send("---------------------------------------");
    // message.channel.send(info.length);
    for (let i = 0; i < info.length; i++) {
      // message.channel.send(JSON.stringify(info[i], null, 2));
      if (info[i].types[0] === "locality") {
        city = info[i].long_name;
      }
      if (info[i].types[0] === "country") {
        country = info[i].long_name;
        countryAbbreviation = info[i].short_name.toLowerCase();
      }
      if (info[i].types[0] === "administrative_area_level_1") {
        region = info[i].long_name;
      }
    }
    message.channel.send(`${city}, ${region}, ${country}  :flag_${countryAbbreviation}:`);
    })
    .catch((error) => {
      message.channel.send(error);
    });
  },
}
