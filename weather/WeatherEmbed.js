const Discord = require("discord.js");
const Weather = require("./Weather");


module.exports = {
  sendEmbed: (currentLocation, currentWeather, footerPicture) => {
    const dayNight = (weather.icon[3] == 'd') ? 0xF4E542 : 0x000000;
    const embed = new Discord.RichEmbed()
      .setTitle(currentLocation.toString())
      .setColor(dayNight)
      // .setDescription()
      .setThumbnail(currentWeather.iconURL)
      .setFooter("̷̧̟̭̺͕̜̦̔̏̊̍ͧ͊́̚̕͞", footerPicture);
      return embed;
  }
}
