let coinsHashMap = new Map();
let coins = 
Object.entries(coins).forEach(
  ([symbol, name]) => { coinsHashMap.set(symbol, name);
});

console.log(coinsHashMap.get("BTC"));
