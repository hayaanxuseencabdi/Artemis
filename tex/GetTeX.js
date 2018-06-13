const fetch = require("node-fetch");
const HelperFunctions = require("../HelperFunctions.js");

module.exports = {
  getTeX: (args) => {
    return fetch(`https://chart.googleapis.com/chart?cht=tx?chl=${args}/gviz/tq?tq=`)
      .then()
  }
}