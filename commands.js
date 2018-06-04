const Discord = require("discord.js");
const request = require("request");
const coins = require("./crypto/coins.js");
const Coin = require("./crypto/coin.js");
const fs = require("fs");
const fetch = require("node-fetch");
const coinsID = JSON.parse(JSON.stringify(require("./crypto/coins.json"))).data;

const footerPicture = "https://cdn.discordapp.com/avatars/451174485933031447/1cfb9e63d3293959ce59ab04c2367396.jpg?size=256";
const coinMap = new Map();

Object.entries(coinsID).forEach(([id, coinInfo]) => {
    coinMap.set(coinInfo.symbol, id);
})

const client = new Discord.Client();

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
    const symbol = args[0].toUpperCase();
    const coinid = coinMap.get(symbol);
    // let currency = (args[1] === undefined) ? "USD" : args[1];
    let coinURL = `https://api.coinmarketcap.com/v2/ticker/${coinid}`;
    fetch(coinURL)
    .then((info) => info.json())
    .then((data) => {
      const coinInfo = data.data;
      const coinPrices = coinInfo.quotes.USD;
      const currentCoin = new Coin(coinInfo.name, coinInfo.symbol, coinInfo.rank, coinPrices.price, [coinPrices.percent_change_1h, coinPrices.percent_change_24h, coinPrices.percent_change_7d]);
      const negPosColour = (coinPrices.percent_change_1h < 0) ? 0x008000 : 0xFF0000;
      const embed = new Discord.RichEmbed()
        // .setTitle(`**${currentCoin.name} (${currentCoin.symbol})**`)
        // .setTitle(`[**${currentCoin.name} (${currentCoin.symbol})**](\`https://coinmarketcap.com/currencies/${currentCoin.name}/\`)`)
        .setThumbnail(`https://s2.coinmarketcap.com/static/img/coins/32x32/${coinid}.png`)
        .setColor(negPosColour)
        // .setDescription(`$${currentCoin.currentPrice}\n`)
        .setDescription(`**[${currentCoin.name} (${currentCoin.symbol})](\`https://coinmarketcap.com/currencies/${currentCoin.name}/\`)**`)
        // .addField("name", "value")
        .addField(`[${currentCoin.name}](https://coinmarketcap.com/currencies/${currentCoin.name})`)
        .setFooter("̷̧̟̭̺͕̜̦̔̏̊̍ͧ͊́̚̕͞" , footerPicture)
        .setTimestamp();
      message.channel.send(embed);
    })
    .catch((error) => {
      message.channel.send(`${symbol} not found.`);
    });
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
