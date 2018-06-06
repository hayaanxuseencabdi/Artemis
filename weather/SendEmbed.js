const Discord = require("discord.js");
const Location = require("./Location");


module.exports = {
  sendEmbed: (message, args, currentLocation) => {
    
    const embed = new Discord.RichEmbed()
    .setTitle(currentLocation.toString())
    .setColor(0xe07f00)
    // .setTimestamp();
    message.channel.send(embed);
  }
}