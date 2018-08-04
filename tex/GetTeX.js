const fs = require ("fs");
const http = require ("http");

module.exports = {
  getTeX: (message, args) => {
    const file = fs.createWriteStream("./tex/tex.png");
    message.channel.send(encodeURI(`http://latex.codecogs.com/png.latex?\\dpi{120}\\bg_white&space;${args}`));
    const request = http.get(encodeURI(`http://latex.codecogs.com/png.latex?\\dpi{120}\\bg_white&space;${args}`),
      (response) => {
        response.pipe(file);
        message.channel.send("" , { files: ["./tex/tex.png"] });
    });
  }
}
