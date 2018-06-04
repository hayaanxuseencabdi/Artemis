module.exports = {
  intersectCommas: (sentence) => {
    if (sentence.length <= 3) { return sentence; }
    const firstInterval = sentence.length % 3 - 3;
    let returnString = [];
    returnString.unshift(sentence.slice(-3));
    for (let i = 1; i < sentence.length / 3; i++) {
      returnString.unshift(sentence.slice(-3 + i * -3, i * -3));
    }
    return returnString.join().toString();
  }
}