class Coin {
  constructor(name, symbol, currentPrice, percentualChanges) {
    this.name = name;
    this.symbol = symbol;
    this.currentPrice = currentPrice;
    this.percentualChanges = percentualChanges;
  }

  toString() {
    return `${this.name}'s (${this.symbol}) current price is ${this.currentPrice} USD.`;
  }
};

module.exports = Coin;