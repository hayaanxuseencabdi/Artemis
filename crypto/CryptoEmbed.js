const fetch = require("node-fetch");
const Discord = require("discord.js");
const HelperFunctions = require("../HelperFunctions.js");
const Coin = require("./Coin.js");

module.exports = {
  embed: (message, arg, coinMap, footerPicture) => {
    const symbol = arg.toUpperCase();
    const coinid = coinMap.get(symbol);

    return fetch(`https://api.coinmarketcap.com/v2/ticker/${coinid}`)
      .then((info) => info.json())
      .then((infoJSON) => {
        const coinInfo = infoJSON.data;
        const coinPrices = coinInfo.quotes.USD;
        const negPosColour = (coinPrices.percent_change_24h > 0) ? 0x008000 : 0xFF0000;

        let marketCap = coinPrices.market_cap || 0.0;
        let dailyVolume = coinPrices.volume_24h ||0.0;
        let supply = coinInfo.circulating_supply || 0.0;
        let currentPrice = coinPrices.price || 0.0;
        let percentualChanges = [coinPrices.percent_change_1h || 0, coinPrices.percent_change_24h || 0, coinPrices.percent_change_7d || 0];

        marketCap = HelperFunctions.intersectCommas(marketCap.toString());
        dailyVolume = HelperFunctions.intersectCommas(dailyVolume.toString());
        supply = HelperFunctions.intersectCommas(supply.toString());

        const currentCoin = new Coin(coinInfo.name, coinInfo.symbol, coinInfo.rank, currentPrice, percentualChanges);

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
          .setFooter("CoinMarketCap" , footerPicture)
          .setTimestamp();
        return embed;
      })
      .catch((error) => {
        console.error(error);
        message.channel.send(`${symbol} not found.`);
      });
  }
}
