const coins = JSON.parse(JSON.stringify(require("./coins.json")));
const request = require("request");

let coinMap = new Map();

for (let i = 0; i < 100; i++) {
  let coinObject = {};
  coinObject.id = coins.data[i].id;
  coinObject.name = coins.data[i].name;
  coinMap.set(coins.data[i].symbol, coinObject);
}
// coinMap.forEach((key, value) => { 
//   console.log(`Key: ${key.id} | Value: ${value}`);
// });

for (let i = 0; i < 1; i++) {
  let coinURL = `https://api.coinmarketcap.com/v2/ticker/${coinMap.get("LTC").id}`;
  request({
    url: coinURL,
    json: true },
    (error, response, body) => { 
      if (!error && response.statusCode === 200) {
        let coinInfo = body.data;
        console.log(JSON.parse(JSON.stringify(coinInfo.quotes.USD.percent_change_1h)));
      } else {
        console.log(`Error ${response.statusCode}`);
      }
    }
  );
}
// console.log(coinMap.get("LTC"));
