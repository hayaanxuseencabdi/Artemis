const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const prefix = config.prefix;

client.on("ready", function () {
    console.log("I am ready!");
});

client.on("message", function (message) {
    if (message.content.startsWith(prefix) && message.channel.id !== config.welcome_channelID) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        switch (command) {
            case "ping":
                message.channel.send(":up: | Pong!");
                break;
            case "blah":
                message.channel.send("Meh.");
                break;
            case "greet":
                if (args[0] !== undefined) {
                    message.channel.send(
                        `Welcome ${args[0]}, courtesy of <@${message.author.id}>!`);
                }
                break;
            case "rep":
                message.channel.send(`:up:  | **${message.author.username} has given ${args[0]} a reputation point!**`);
                break;
            case "daily":
                message.channel.send(`:atm:  | **${message.author.username} has given ${args[0]} :yen: 100 credits!**`);
                break;
            case "repdaily":
                message.channel.send(`:up:  | **${message.author.username} has given ${args[0]} a reputation point!**`);
                message.channel.send(`:atm:  | **${message.author.username} has given ${args[0]} :yen: 100 credits!**`);
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
