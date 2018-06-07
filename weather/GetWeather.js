const fetch = require("node-fetch");
const Location = require("./Location");
const location = require("./LocationSearch");
const Discord = require("discord.js");
const weatherEmbed = require("./SendEmbed");
const Weather = require("./Weather");
const config = require("../config.json");

module.exports = {
  getWeather: async (message, args) => {
    
    let currentLocation = await location.returnCoordinates(message, args);
    message.channel.send(`Lat: ${currentLocation.latitude}; Long: ${currentLocation.longitude}`);
    console.log(currentLocation.latitude, currentLocation.longitude);
    // Temp returned is in Kelvin
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&appid=${config.openweathermapAPI}`)
    .then((unparsedJSON) => unparsedJSON.json())
    .then((info) => {
      message.channel.send(`${info.main.temp}; ${info.main.humidity}; ${info.wind.speed}; ${info.clouds.all}`);
      const currentWeather = new Weather(info.main.temp, info.main.humidity, info.wind.speed, info.clouds.all);
      message.channel.send(currentWeather.toString());
    })
    .catch((error) => {
      console.log(`getWeather error: ${error}`);
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
