const request = require("request");

const BASE_URL = "http://rtex.probablyaweb.site/api/v2"

module.exports = {
  getTeX: (message, texQuery) => {
    const options = {
      method: 'POST',
      body: {
        'code': `\begin{document} ${texQuery.replace()} \end{document}`,
        'format': 'png'
      },
      json: true,
      url: BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    request(options, (err, res, body) => {
      if (err) {
        console.log('Error :', err)
        return
      }
      console.log('Body :', body)
    });
  }
}
