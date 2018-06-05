const fetch = require("node-fetch");
const helper = require("../HelperFunctions");
const config = require("../config.json");
const Location = require("./Location");
const location = require("./LocationSearch");

module.exports = {
  getWeather: async (message, args) => {
    
    var currentLocation = await location.returnCoordinates(message, args);
    message.channel.send(currentLocation.toString());


    
    // location.returnCoordinates(message, args)
    // .then((currentLocation) => {
    //   message.channel.send(currentLocation.toString());
    // });
  },
}
