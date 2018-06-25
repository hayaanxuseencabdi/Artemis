const fs = require ("fs");
const http = require ("http");

module.exports = {
  getTeX: (message, args) => {
    const file = fs.createWriteStream("./tex/tex.png");
    const request = http.get(encodeURI(`http://latex.codecogs.com/png.latex?${args}`),
      response => {
        response.pipe(file);
        message.channel.send("" , { files: ["./tex/tex.png"] });
      });
  }
}
