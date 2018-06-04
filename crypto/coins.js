// const coins = JSON.parse(JSON.stringify(require("./coins.json"))).data;
// // const request = require("request");
// const Coin = require("./coin.js");
// // const fs = require("fs");
// const fetch = require("node-fetch");

// let coinMap = new Map();

// Object.entries(coins).forEach(([id, coinInfo]) => {
//     coinMap.set(coinInfo.symbol, id);
// })


// /* Pull JSON for specific coin and return a coin object containing the coin's 
// * current information using the CoinMarketCap API
// * @param symbol: Cryptocoin's symbol, all CAPS
// */
// // exports.getCoinInformation = (inputSymbol) => {
// //   // If the coin isn't in the top 100, return undefined and error handle in commands.js
// //   if (!coinMap.get(inputSymbol)) { return undefined; }
// //   let coinURL = `https://api.coinmarketcap.com/v2/ticker/${coinMap.get(inputSymbol)}`;
// //   fetch(coinURL)
// //     .then((data) => { 
// //       console.log(data);
// //      })
// //     .catch((error) => { 
// //       console.log(error);
// //     });
// // }


// function createCoin(params) {
//   return new Coin(coinInfo.name, coinInfo.symbol, coinPrices.price,
//     [coinPrices.percent_change_1h, coinPrices.percent_change_24h, coinPrices.percent_change_7d]);
// }

// function getCoinInformation(symbol) {
//   let coinURL = `https://api.coinmarketcap.com/v2/ticker/${coinMap.get(${symbol})}`;
//   fetch(coinURL)
//   .then((info) => info.json())
//   .then((data) => {
//     const coinInfo = data.data;
//     const coinPrices = coinInfo.quotes.USD;
//     // console.log(coinInfo);
//     // console.log();
//     // console.log(coinPrices);
//     let coin = new Coin(coinInfo.name, coinInfo.symbol, coinPrices.price, [coinPrices.percent_change_1h, coinPrices.percent_change_24h, coinPrices.percent_change_7d]);
//     // console.log(coin);
//     return coin;
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// }

// let test = getCoinInformation("XRP");
// console.log(test);
