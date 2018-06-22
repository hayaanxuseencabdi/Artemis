const fetch = require("node-fetch");
const mathjax = require("mathjax-node-svg2png");
const HelperFunctions = require("../HelperFunctions.js");

// module.exports = {
//   getTeX: (args) => {
//     return fetch(`https://chart.googleapis.com/chart?cht=tx?chl=${args}/gviz/tq?tq=`)
//       .then()
//   }
// }

mathjax.start();

let myMath = "{1 \\over 2} \\cdot \\int^{12}_{2} 3x \\ dx";

mathjax.typeset({
  math: myMath,
  format: "TeX",
  png: true,
  scale: 1
}, (data) => {
  if (!data.errors) {
    console.log(JSON.stringify(data, null, 2));
    console.log(myMath);
  }
});