// Requirements
const Discord = require("discord.js");
const request = require("request");
const fs = require("fs");
const fetch = require("node-fetch");
const helper = require("./HelperFunctions");

const Coin = require("./crypto/Coin");
const crypto = require("./crypto/SendEmbed");
const weather = require("./weather/RetrieveWeather");
const location = require("./weather/LocationSearch");



// Constants
const coinsSymbolID = require("./crypto/AllCoins.json").data;
const footerPicture = "https://cdn.discordapp.com/avatars/451174485933031447/1cfb9e63d3293959ce59ab04c2367396.jpg?size=256";
const coinMap = new Map();
const client = new Discord.Client();

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
  weather: (message, args) => {
    const allArgs = args.join(" ");
    // location.returnCoordinates(message, args);
    weather.getWeather(message, args);
  },
  coin: (message, args) => {
    const allArgs = [args];
    allArgs.forEach((arg) => {
      crypto.sendEmbed(message, arg, coinMap, footerPicture);
    })
  },
  avatar: (message, args) => {
    const embed = helper.createAvatarEmbed(message, args, footerPicture);
    message.channel.send(embed);


    // let image = [];
    // image = (args[0] !== undefined) ? message.mentions.users.array() : [message.author];
    // image.forEach((user) => { 
    //   const embed = new Discord.RichEmbed()
    //     .setColor(0xFF8001)
    //     .setDescription(`**[${user.tag}](${user.avatarURL})**`)
    //     .setImage(user.avatarURL)
    //     .setFooter("̷̧̟̭̺͕̜̦̔̏̊̍ͧ͊́̚̕͞" , footerPicture)
    //     .setTimestamp();
    // message.channel.send(embed);
    // })
  }
}
