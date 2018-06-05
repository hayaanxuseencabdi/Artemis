const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const prefix = config.prefix;

// Functions to perform the commands
const commands = require("./Commands");

client.on("ready", function () {
  console.log("I am ready!");
});

client.on("message", function (message) {
  if (message.content.startsWith(prefix) && message.channel.id !== config.welcome_channelID) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const currentCommand = args.shift().toLowerCase();
    switch (currentCommand) {
      case "ping":
        message.channel.send("Pong!");
        break;
      case "blah":
        message.channel.send("Meh.");
        break;
      case "greet":
        commands.greet(message, args);
        break;
      case "rep":
        commands.rep(message, args);
        break;
      case "daily":
        commands.daily(message, args);
        break;
      case "repdaily":
        commands.repDaily(message, args);
        break;
      case "weather":
        commands.weather(message, args);
        break;
      case "coin":
        commands.coin(message, args);
        break;
      case "avatar":
        commands.avatar(message, args);
        break;
      case "kick":
        const kickedUser = message.mentions.members.first();
        kickedUser.kick();
        break;
      case "ban":
        const bannedUser = message.mentions.members.first();
        bannedUser.ban();
        break;
      default:
        message.channel.send("Invalid command, try again.");
        break;
    }
  } else if (message.channel.id === config.welcome_channelID && !message.author.bot) {
    message.channel.send(`Welcome sxb <@${message.author.id}>!`);
  }
});

client.login(config.artemis_token);
