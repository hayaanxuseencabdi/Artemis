const coins = JSON.parse(JSON.stringify(require("./coins.json"))).data;
const request = require("request");
const Coin = require("./coin.js");
const fs = require("fs");

let coinMap = new Map();

Object.entries(coins).forEach(([id, coinInfo]) => {
    coinMap.set(coinInfo.symbol, id);
})


/* Pull JSON for specific coin and return a coin object containing the coin's 
* current information using the CoinMarketCap API
* @param symbol: Cryptocoin's symbol, all CAPS
*/
exports.getCoinInformation = (inputSymbol) => {
  // If the coin isn't in the top 100, return undefined and error handle in commands.js
  if (!coinMap.get(inputSymbol)) { return undefined; }
  let coinURL = `https://api.coinmarketcap.com/v2/ticker/${coinMap.get(inputSymbol)}`;
  request({
    url: coinURL,
    json: true },
    (error, response, body) => { 
      if (!error && response.statusCode === 200) {
        fs.writeFile("./crypto/currentcoin.json", JSON.stringify(body.data, null, 2), (err) => {
          if (err) { return console.log(err); }
          console.log("File with the coin's information has been succesfully saved.");
         })
      } else {
        console.log(`Error code: ${response.statusCode} | Symbol ${inputSymbol}`);
      }
    }
  );
}
