// Requirements
const Discord = require("discord.js");
const request = require("request");
const fs = require("fs");
const fetch = require("node-fetch");

const Coin = require("./crypto/coin.js");
const helper = require("./helper.js");



// Constants
const coinsID = JSON.parse(JSON.stringify(require("./crypto/coins.json"))).data;
const footerPicture = "https://cdn.discordapp.com/avatars/451174485933031447/1cfb9e63d3293959ce59ab04c2367396.jpg?size=256";
const coinMap = new Map();
const blank = "̷̧̟̭̺͕̜̦̔̏̊̍ͧ͊́̚̕͞";

// Object.entries(coinsID).forEach(([id, coinInfo]) => {
//     coinMap.set(coinInfo.symbol, id);
// })

Object.entries(coinsID).forEach(([coinJSON]) => {
  coinMap.set(coinJSON.symbol, coinJSON.id);
})


console.log(coinMap.size);

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
    let coinURL = `https://api.coinmarketcap.com/v2/ticker/${coinid}`;

    fetch(coinURL)
    .then((info) => info.json())
    .then((infoJSON) => {
      const coinInfo = infoJSON.data;
      const coinPrices = coinInfo.quotes.USD;
      const negPosColour = (coinPrices.percent_change_24h > 0) ? 0x008000 : 0xFF0000;


      const marketCap = helper.intersectCommas(coinPrices.market_cap.toString());
      const dailyVolume = helper.intersectCommas(coinPrices.volume_24h.toString());
      const supply = helper.intersectCommas(coinInfo.total_supply.toString());

      const currentCoin = new Coin(coinInfo.name, coinInfo.symbol, coinInfo.rank, coinPrices.price,
        [coinPrices.percent_change_1h, coinPrices.percent_change_24h, coinPrices.percent_change_7d],
        coinPrices.market_cap, coinPrices.volume_24h, coinInfo.total_supply);
      
      const embed = new Discord.RichEmbed()
        .setThumbnail(`https://s2.coinmarketcap.com/static/img/coins/64x64/${coinid}.png`)
        .setColor(negPosColour)
        .setTitle(`${currentCoin.name} (${currentCoin.symbol})`)
        .setURL(`https://coinmarketcap.com/currencies/${currentCoin.name}`)
        .setDescription(`**${currentCoin.currentPrice} USD**\n\n` +
          `**Rank**: ${currentCoin.rank}\n\n`+
          `**Delta 1h:**\t\t\t\t${currentCoin.percentualChanges[0]}%\n`+
          `**Delta 24h:**\t\t\t${currentCoin.percentualChanges[1]}%\n`+
          `**Delta 7 days:**\t\t${currentCoin.percentualChanges[2]}%\n\n`+
          `**Market cap:**\t\t $${marketCap}\n**24h volume:**\t\t$${dailyVolume}\n`+
          `**Supply:**\t\t\t\t ${supply}`)
        .setFooter("CoinMarketCap API" , footerPicture)
        .setTimestamp();
      message.channel.send(embed);
      // message.channel.send(JSON.stringify(coinInfo, null, 2));
    })
    .catch((error) => {
      message.channel.send(`${error}\n${symbol} not found.`);
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
        .setFooter(blank , footerPicture)
        .setTimestamp();
      message.channel.send(embed);
     })
  }
}
