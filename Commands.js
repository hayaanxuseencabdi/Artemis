// Node modules
const helper = require("./HelperFunctions");

// Personal modules
const cryptoEmbed = require("./crypto/CryptoEmbed");
const getWeather = require("./weather/GetWeather");

// Constants
const coinsSymbolID = require("./crypto/AllCoins.json").data;
const footerPicture = "https://cdn.discordapp.com/avatars/451174485933031447/1cfb9e63d3293959ce59ab04c2367396.jpg?size=256";
const coinMap = new Map();

coinsSymbolID.forEach((coinJSON) => {
  coinMap.set(coinJSON.symbol, coinJSON.id)
});

module.exports = {
  greet: (message) => {
    let mentionedUsers = message.mentions.users;
    if (mentionedUsers.size) {
      let greetString = "";
      mentionedUsers.array().forEach(user => {
        greetString += `${user}, `;
      });
      message.channel.send(`Welcome ${greetString}courtesy of <@${message.author.id}>.`);
    } else {
      message.channel.send("Incorrect usage. No-one to greet was mentioned, try again.");
    }
  },
  weather: async (message, args) => {
    getWeather.getWeather(message, args.join(" "), footerPicture);
  },
  coin: (message, args) => {
    if (args.length > 3) {
      message.channel.send("Too many queries, limit of 3.");
    } else if (!args.length) {
      message.channel.send("No queries given.");
    } else {
      args.forEach(async (arg) => {
        const currentEmbed = await cryptoEmbed.sendEmbed(message, arg, coinMap, footerPicture);
        message.channel.send(currentEmbed);
      })
    }
  },
  avatar: async (message, args) => {
    const embeds = await helper.createAvatarEmbed(message, args, footerPicture);
    embeds.forEach((embed) => {
      message.channel.send(embed);
    });
  },
  silence: (message) => {
    if (!helper.authoriseExecuter(message.author.id)) { return; }
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
    if (!helper.authoriseExecuter(message.author.id)) { return; }
    message.delete();
    const muteUser = message.mentions.members.first();
    muteUser.setMute(!muteUser.serverMute)
    .catch(console.error);
  },
  deafen: (message) => {
    if (!helper.authoriseExecuter(message.author.id)) { return; }
    message.delete();
    const deafenedUser = message.mentions.members.first();
    deafenedUser.setDeaf(!deafenedUser.deaf);
  }
}
