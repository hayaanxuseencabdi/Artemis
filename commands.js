// switch (command) {
//   case "greet":
    
//   case "rep":
//     
//     break;
//   case "daily":
//     
//     break;
//   case "repdaily":
//     message.channel.send(`:up:  | **${message.author.username} has given ${args[0]} a reputation point!**`);
//     message.channel.send(`:atm:  | **${message.author.username} has given ${args[0]} :yen: 100 credits!**`);
//     break;
//   case "kick":
//     const kickedUser = message.mentions.members.first();
//     kickedUser.kick();
//     break;
//   case "ban":
//     const bannedUser = message.mentions.members.first();
//     bannedUser.ban();
//     break;
// }
module.exports = {
  greet: function (message, args) {
    if (args[0] !== undefined) {
      message.channel.send(`Welcome ${args[0]}, courtesy of <@${message.author.id}>!`);
    }
  },
  rep: function (message, args) {
    message.channel.send(`:up:  | **${message.author.username} has given ${args[0]} a reputation point!**`);
  },
  daily: function (message, args) {
    message.channel.send(`:atm:  | **${message.author.username} has given ${args[0]} :yen: 100 credits!**`);
  },
  repDaily: function (message, args) {
    this.rep(message, args); this.daily(message, args);
  },
  weather: function (message, args) {
    message.channel.send(`Weather in ${args}. Currently not implemented yet. Coming soon!`);
  },
}