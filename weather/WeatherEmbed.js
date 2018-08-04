const Discord = require("discord.js");

module.exports = {
  embed: (currentLocation, currentWeather, dayNightChar) => {
    const weatherEmbed = new Discord.RichEmbed()
      .setDescription(currentLocation.toString())
      .setColor((dayNightChar == 'd') ? 0xF4E542 : 0x000000)
      .setThumbnail(currentWeather.iconURL)
      .setURL(currentWeather.weatherURL)
      .addField(`${currentWeather.celsius} °C | ${currentWeather.fahrenheit} °F`, `**Weather:** ${currentWeather.weatherConditions}\n` + 
        `**Humidity:** ${currentWeather.humidity}%\n**Cloudiness:** ${currentWeather.cloudiness}%\n` +
        `**Wind speed:** ${currentWeather.windSpeedMetres} m/s | ${currentWeather.windSpeedMiles}mph`);
    return weatherEmbed;
  }
}
