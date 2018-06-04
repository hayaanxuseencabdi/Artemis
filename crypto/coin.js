class Coin {
  constructor(name, symbol, rank, currentPrice, percentualChanges, marketCap, dailyVolume, supply) {
    this.name = name;
    this.symbol = symbol;
    this.rank = rank;
    this.currentPrice = currentPrice.toFixed(2);
    this.percentualChanges = percentualChanges;
    this.marketCap = marketCap;
    this.dailyVolume = dailyVolume;
    this.supply = supply;
  }

  toString() {
    return `${this.name}'s (${this.symbol}) current price is ${this.currentPrice} USD.`;
  }
};

module.exports = Coin;
