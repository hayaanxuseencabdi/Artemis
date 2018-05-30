var Discord = require("discord.js");
var config = require("./config.json");
var client = new Discord.Client();
var prefix = config.prefix;
client.on("ready", function () {
    console.log("I am ready!");
});
client.on("message", function (message) {
    if (message.author.id !== config.ownerID) {
        return;
        message.channel.send("Hey Hayaan");
    }
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }
    if (message.content.startsWith(prefix + "ping")) {
        message.channel.send("pong!");
    }
    else if (message.content.startsWith(prefix + "foo")) {
        message.channel.send("bar!");
    }
});
client.login(config.artemis_token);
