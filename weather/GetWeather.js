const fetch = require("node-fetch");
const location = require("./LocationSearch");
const Weather = require("./Weather");
const weatherEmbed = require("./WeatherEmbed");

module.exports = {
  getWeather: async (message, args, footerPicture) => {
    let currentLocation = await location.returnCoordinates(message, args);
    message.channel.send(`Lat: ${currentLocation.latitude}; Long: ${currentLocation.longitude}`);
    // console.log(currentLocation.latitude, currentLocation.longitude);
    // Temp returned is in Kelvin
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&appid=${process.env.OPENWEATHERMAP}`)
    .then((unparsedJSON) => unparsedJSON.json())
    .then((info) => {
      // message.channel.send(JSON.stringify(info, null, 2));
      // message.channel.send(`Cloudiness from JSON: ${typeof(info.clouds.all)}`);
      const currentWeather = new Weather(currentLocation.formattedAddress, info.main.temp, info.main.humidity, info.wind.speed, info.clouds.all, info.weather.icon);
      // return currentWeather.toString();
      const embed = weatherEmbed.sendEmbed(currentLocation, currentWeather, footerPicture);
      return embed;
    })
    .catch((error) => {
      message.channel.send(error);
    });










    // let weatherMessage = await weatherEmbed.sendEmbed(message, args, currentLocation, weatherInfo);

    // const embed = new Discord.RichEmbed()
    //   .setTitle(currentLocation.toString())
    //   .setColor(0xe07f00)
    //   // .setTimestamp();
    // message.channel.send(embed);

    // message.channel.send(currentLocation.toString());


    
    // location.returnCoordinates(message, args)
    // .then((currentLocation) => {
    //   message.channel.send(currentLocation.toString());
    // });
  },
}
