// Requirements
const Discord = require("discord.js");
const request = require("request");
const fs = require("fs");
const fetch = require("node-fetch");
const helper = require("./helperFunctions.js");

const Coin = require("./crypto/coin.js");
const crypto = require("./crypto/sendEmbed.js");



// Constants
const coinsSymbolID = require("./crypto/allcoins.json").data;
const footerPicture = "https://cdn.discordapp.com/avatars/451174485933031447/1cfb9e63d3293959ce59ab04c2367396.jpg?size=256";
const coinMap = new Map();
const client = new Discord.Client();

coinsSymbolID.forEach((coinJSON) => {
  coinMap.set(coinJSON.symbol, coinJSON.id)
});


module.exports = {
  greet: function (message) {
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
  rep: function (message, args) {
    if (args[0] !== undefined) {
      message.channel.send(`:up:  | **${message.author.username} has given ${args[0]} a reputation point!**`);
    } else {
      message.channel.send("Incorrect usage. No-one to rep was mentioned, try again.");
    }
  },
  daily: function (message, args) {
    let currentUser = args[0].substring(2, args[0].length  - 1);
    // if (args[0] !== undefined) {
    //   message.channel.send(`:atm:  | **${message.author.username} has given ${args[0]} :yen: 100 credits!**`);
    // } else {
    //   message.channel.send("Incorrect usage. No-one to rep was mentioned, try again.");
    // }
    console.log(currentUser);
    console.log(typeof(currentUser));
    if (client.users.get(currentUser) === undefined) {
      message.channel.send("Defined.");
      // message.channel.send(client.users.get(args[0]).username);
    } else {
      message.channel.send("Undefined.");
    }
  },
  repDaily: function (message, args) {
    this.rep(message, args); this.daily(message, args);
  },
  weather: function (message, args) {
    message.channel.send(`Weather in ${args}. Currently not implemented yet. Coming soon!`);
  },
  coin: function (message, args) {
    crypto.sendEmbed(message, args, coinMap, footerPicture, Coin, helper, Discord, fetch);
  },
  avatar: (message, args) => {
    let image = [];
    image = (args[0] !== undefined) ? message.mentions.users.array() : [message.author];
    image.forEach((user) => { 
      const embed = new Discord.RichEmbed()
        .setColor(0xFF8001)
        .setDescription(`**[${user.tag}](${user.avatarURL})**`)
        .setImage(user.avatarURL)
        .setFooter("̷̧̟̭̺͕̜̦̔̏̊̍ͧ͊́̚̕͞" , footerPicture)
        .setTimestamp();
      message.channel.send(embed);
     })
  }
}
