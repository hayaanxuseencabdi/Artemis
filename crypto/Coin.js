class Coin {
  constructor(name, symbol, rank, currentPrice, percentualChanges) {
    this.name = name || "";
    this.symbol = symbol || "";
    this.rank = rank || "";
    this.currentPrice = currentPrice.toFixed(2) || 0.0;
    this.percentualChanges = percentualChanges;
  }

  toString() {
    return `${this.name}'s (${this.symbol}) current price is ${this.currentPrice} USD.`;
  }
};

module.exports = Coin;
