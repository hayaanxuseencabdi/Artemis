const fetch = require("node-fetch");
const Location = require("./Location");
const location = require("./LocationSearch");
const Discord = require("discord.js");

module.exports = {
  getWeather: async (message, args) => {
    
    let currentLocation = await location.returnCoordinates(message, args);


    const embed = new Discord.RichEmbed()
      .setTitle(currentLocation.toString())
      .setColor(0xe07f00)
      // .setTimestamp();
    message.channel.send(embed);

    // message.channel.send(currentLocation.toString());


    
    // location.returnCoordinates(message, args)
    // .then((currentLocation) => {
    //   message.channel.send(currentLocation.toString());
    // });
  },
}
