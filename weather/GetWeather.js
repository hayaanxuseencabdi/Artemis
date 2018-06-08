const fetch = require("node-fetch");
const location = require("./LocationSearch");
const Weather = require("./Weather");
const Discord = require("discord.js");
const helper = require("../HelperFunctions");

module.exports = {
  getWeather: async (message, args, footerPicture) => {
    let currentLocation = await location.returnCoordinates(message, args);
    if (currentLocation === undefined) { return;; }
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&appid=${process.env.OPENWEATHERMAP}`)
    .then((unparsedJSON) => unparsedJSON.json())
    .then((info) => {
      const currentWeather = new Weather(currentLocation.formattedAddress, helper.capitalise(info.weather[0].description),
        info.main.temp, info.main.humidity, info.wind.speed,
        info.clouds.all, info.weather[0].icon);
      const weatherEmbed = new Discord.RichEmbed()
        .setTitle(currentLocation.toString())
        .setColor((info.weather[0].icon[2] == 'd') ? 0xF4E542 : 0x000000)
        .setThumbnail(currentWeather.iconURL)
        .setURL(currentWeather.weatherURL)
        .setDescription(`**Weather:** ${currentWeather.weatherConditions}\n` +
          `**Temperature:** ${currentWeather.celsius} °C | ${currentWeather.fahrenheit} °F\n` + 
          `**Humidity:** ${currentWeather.humidity}%\n**Cloudiness:** ${currentWeather.cloudiness}%\n` +
          `**Wind speed:** ${currentWeather.windSpeedMetres} m/s | ${currentWeather.windSpeedMiles}mph`);
      message.channel.send(weatherEmbed);
    })
    .catch((error) => {
      console.log(`getWeather error: ${error}`);
      console.log(error);
    });
  },
}
