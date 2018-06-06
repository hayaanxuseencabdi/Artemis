const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
  intersectCommas: (sentence) => {
    if (sentence.length <= 3) { return sentence; }
    const firstInterval = sentence.length % 3 - 3;
    let returnString = [];
    returnString.unshift(sentence.slice(-3));
    for (let i = 1; i < sentence.length / 3; i++) {
      returnString.unshift(sentence.slice(-3 + i * -3, i * -3));
    }
    return returnString.join().toString();
  },
  transformToQuery: (location) => {
    return location.toString().replace(/\s+/g, '%20');
  },
  createAvatarEmbed:(message, args, footerPicture) => {
    let image = [];
    image = (args[0] !== undefined) ? message.mentions.users.array() : [message.author];
    image.forEach((user) => { 
      const embed = new Discord.RichEmbed()
        .setColor(0xFF8001)
        .setDescription(`**[${user.tag}](${user.avatarURL})**`)
        .setImage(user.avatarURL)
        .setFooter("̷̧̟̭̺͕̜̦̔̏̊̍ͧ͊́̚̕͞" , footerPicture)
        .setTimestamp();
      return embed;
     })
  }
}
