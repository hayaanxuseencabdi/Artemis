const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const prefix = config.prefix;

// Functions to perform certain commands
const commands = require("./Commands");

client.on("ready", function () {
  console.log("Online");
});

client.on("message", function (message) {
  if (message.content.startsWith(prefix) && message.channel.id !== config.welcome_channelID) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const currentCommand = args.shift().toLowerCase();
    switch (currentCommand) {
      case "ping":
        message.channel.send("Pong!");
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
        message.mentions.members.first().kick();
        break;
      case "ban":
        message.mentions.members.first().ban();
        break;
      case "silence":
        commands.silence(message);
        break;
      case "mute":
        commands.mute(message);
        break;
      case "deafen":
        commands.deafen(message);
        break;
      default:
        message.channel.send("Invalid command, try again.");
        break;
    }
  } else if (message.channel.id === config.welcome_channelID && !message.author.bot) {
    message.channel.send(`Welcome sxb <@${message.author.id}>!`);
  }
});

client.login(process.env.ARTEMIS);
