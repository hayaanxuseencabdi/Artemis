const coins = JSON.parse(JSON.stringify(require("./coins.json"))).data;
// const request = require("request");
const Coin = require("./coin.js");
// const fs = require("fs");
const fetch = require("node-fetch");

let coinMap = new Map();

Object.entries(coins).forEach(([id, coinInfo]) => {
    coinMap.set(coinInfo.symbol, id);
})


/* Pull JSON for specific coin and return a coin object containing the coin's 
* current information using the CoinMarketCap API
* @param symbol: Cryptocoin's symbol, all CAPS
*/
// exports.getCoinInformation = (inputSymbol) => {
//   // If the coin isn't in the top 100, return undefined and error handle in commands.js
//   if (!coinMap.get(inputSymbol)) { return undefined; }
//   let coinURL = `https://api.coinmarketcap.com/v2/ticker/${coinMap.get(inputSymbol)}`;
//   fetch(coinURL)
//     .then((data) => { 
//       console.log(data);
//      })
//     .catch((error) => { 
//       console.log(error);
//     });
// }
let coinURL = `https://api.coinmarketcap.com/v2/ticker/${coinMap.get("ETH")}`;
fetch(coinURL)
.then((info) => { console.log(info.json()); })
.catch((error) => {
  console.log("gesgs");
  console.log(error);
});
console.log(coinMap.get("ETH"));
