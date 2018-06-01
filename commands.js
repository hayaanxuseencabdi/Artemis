const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
  greet: function (message) {
    let mentionedUsers = message.mentions.users;
    if (mentionedUsers.size) {
      let greetString = "";
      mentionedUsers.array().forEach(user => {
        greetString += `${user}, `;
      });
      message.channel.send(`Welcome ${greetString}courtesy of <@${message.author.id}>.`);
    } else {
      message.channel.send("Incorrect usage. No-one to greet was mentioned, try again.");
    }
  },
  rep: function (message, args) {
    if (args[0] !== undefined) {
      message.channel.send(`:up:  | **${message.author.username} has given ${args[0]} a reputation point!**`);
    } else {
      message.channel.send("Incorrect usage. No-one to rep was mentioned, try again.");
    }
  },
  daily: function (message, args) {
    let currentUser = args[0].substring(2, args[0].length  - 1);
    // if (args[0] !== undefined) {
    //   message.channel.send(`:atm:  | **${message.author.username} has given ${args[0]} :yen: 100 credits!**`);
    // } else {
    //   message.channel.send("Incorrect usage. No-one to rep was mentioned, try again.");
    // }
    console.log(currentUser);
    console.log(typeof(currentUser));
    if (client.users.get(currentUser) === undefined) {
      message.channel.send(client.users.get(args[0]).username);
    } else {
      message.channel.send("Undefined sxb.");
    }
  },
  repDaily: function (message, args) {
    this.rep(message, args); this.daily(message, args);
  },
  weather: function (message, args) {
    message.channel.send(`Weather in ${args}. Currently not implemented yet. Coming soon!`);
  },
}
