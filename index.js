var Discord = require("discord.js");
var config = require("./config.json");
var client = new Discord.Client();
var prefix = config.prefix;

client.on("ready", function () {
    console.log("I am ready!");
});

client.on("message", function (message) {
    // Check author of the message, return if it isn't the creator a.k.a. me
    // if (message.author.id === config.ownerID) {
    //     message.channel.send("Hello Hayaan");
    // } else 
    if (message.content.startsWith(prefix) || !message.author.bot) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        switch (command) {
            case "ping":
                message.channel.send("Pong!");
                break;
            case "blah":
                message.channel.send("Meh.");
                break;
            default:
                message.channel.send("Invalid command, try again.");
                break;
        }
    } else {
        return;
    }


    // if (!message.content.startsWith(prefix) || message.author.bot) {
    //     return;
    // }
    // if (message.content.startsWith(prefix + "ping")) {
    //     message.channel.send("pong!");
    // }
    // else if (message.content.startsWith(prefix + "foo")) {
    //     message.channel.send("bar!");
    // }
});

client.login(config.artemis_token);
