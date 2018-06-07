const fetch = require("node-fetch");
const Discord = require("discord.js");
const helper = require("../HelperFunctions.js");
const Coin = require("./Coin.js");

module.exports = {
  sendEmbed: (message, arg, coinMap, footerPicture) => {
    const symbol = arg.toUpperCase();
    const coinid = coinMap.get(symbol);

    return fetch(`https://api.coinmarketcap.com/v2/ticker/${coinid}`)
    .then((info) => info.json())
    .then((infoJSON) => {
      const coinInfo = infoJSON.data;
      const coinPrices = coinInfo.quotes.USD;
      const negPosColour = (coinPrices.percent_change_24h > 0) ? 0x008000 : 0xFF0000;

      //TODO: corner case check for null values
      // let marketCap = 0;
      // message.channel.send("test");
      // if (coinPrices.market_cap !== null) {
      //   marketCap = helper.intersectCommas(coinPrices.market_cap.toString());
      // }
      const marketCap = helper.intersectCommas(coinPrices.market_cap.toString());
      const dailyVolume = helper.intersectCommas(coinPrices.volume_24h.toString());
      const supply = helper.intersectCommas(coinInfo.circulating_supply.toString());

      const currentCoin = new Coin(coinInfo.name, coinInfo.symbol, coinInfo.rank, coinPrices.price,
        [coinPrices.percent_change_1h.toFixed(2), coinPrices.percent_change_24h.toFixed(2), coinPrices.percent_change_7d.toFixed(2)]);

      const embed = new Discord.RichEmbed()
        .setThumbnail(`https://s2.coinmarketcap.com/static/img/coins/64x64/${coinid}.png`)
        .setColor(negPosColour)
        .setTitle(`${currentCoin.name} (${currentCoin.symbol})`)
        .setURL(`https://coinmarketcap.com/currencies/${currentCoin.name.replace(/\s+/g, "-")}`)
        .setDescription(`**${currentCoin.currentPrice} USD**\n\n` +
          `**Rank**: ${currentCoin.rank}\n\n`+
          `**Delta 1h:** ${currentCoin.percentualChanges[0]}%\n`+
          `**Delta 24h:** ${currentCoin.percentualChanges[1]}%\n`+
          `**Delta 7 days:** ${currentCoin.percentualChanges[2]}%\n\n`+
          `**Market cap:** $${marketCap}\n**24h volume:** $${dailyVolume}\n`+
          `**Supply:** ${supply} ${symbol}`)
        .setFooter("CoinMarketCap API" , footerPicture)
        .setTimestamp();
      return embed;
    })
    .catch((error) => {
      message.channel.send(`${error}\n${symbol} not found.`);
    });
  }
}