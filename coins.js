const coins = JSON.parse(JSON.stringify(require("./coins.json")));
let coinsHashMap = new Map();

for (let i = 0; i < 1000; i++) {
    coinsHashMap.set(coins.data[i].symbol, coins.data[i].name);
}
coinsHashMap.forEach((key, value) => { 
  console.log(`Key: ${key} | Value: ${value}`);
});