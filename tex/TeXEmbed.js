const Discord = require("discord.js");

module.exports = {
  sendEmbed: () => {
    return new Promise((resolve) => {
      const embed = new Discord.RichEmbed()
      .setAuthor("me");
      resolve(embed);
    });
  }
}