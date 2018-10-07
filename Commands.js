// Node modules
const HelperFunctions = require("./HelperFunctions");

// Personal modules
const Crypto = require("./crypto/CryptoEmbed");
const Weather = require("./weather/GetWeather");
const TeX = require("./tex/GetTeX");

// Constants
const footerPicture = "https://cdn.discordapp.com/avatars/451174485933031447/1cfb9e63d3293959ce59ab04c2367396.jpg?size=256";

module.exports = {
  weather: (message, args) => {
    Weather.getWeather(args.join(" "))
      .then(embed => message.channel.send(embed))
      .catch(error => console.log(error));
  },
  coin: (message, coinMap, args) => {
    if (args.length > 3) {
      message.channel.send("Too many queries, limit of 3.");
    } else if (!args.length) {
      message.channel.send("Received no queries.")
        .then((msg) => {
          msg.delete(3000);
          message.delete();
        })
        .catch(err => console.error(err));
    } else {
      args.forEach((arg) => {
        Crypto.embed(message, arg, coinMap, footerPicture)
          .then(embed => message.channel.send(embed))
          .catch(error => console.log(error));
      })
    }
  },
  tex: (message, args) => {
    message.channel.send(args);
    TeX.getTeX(message, args.join(' '));
    console.log(args);
  },
  avatar: (message, args) => {
    if (message.mentions.users.array().length > 3) {
      message.channel.send("Too many queries, limit of 3.");
      message.delete(5000);
      return;
    }
    HelperFunctions.createAvatarEmbed(message, args, footerPicture)
      .then((embeds) => {
        embeds.forEach((embed) => {
          message.channel.send(embed); 
        });
      })
      .catch(error => console.log(error));
  },
  silence: (message) => {
    if (!HelperFunctions.authoriseExecuter(message)) { return; }
    message.delete();
    const silencedUser = message.mentions.members.first();
    const silencedRoleID = message.guild.roles.find("name", "silenced").id;
    if (!silencedUser.roles.has(silencedRoleID)) {
      silencedUser.addRole(silencedRoleID)
      .catch(console.error);
    } else {
      silencedUser.removeRole(silencedRoleID)
      .catch(console.error);
    }
  },
  mute: (message) => {
    if (!HelperFunctions.authoriseExecuter(message)) { return; }
    message.delete();
    const muteUser = message.mentions.members.first();
    muteUser.setMute(!muteUser.serverMute)
    .catch(console.error);
  },
  deafen: (message) => {
    if (!HelperFunctions.authoriseExecuter(message)) { return; }
    message.delete();
    const deafenedUser = message.mentions.members.first();
    deafenedUser.setDeaf(!deafenedUser.deaf);
  }
}
