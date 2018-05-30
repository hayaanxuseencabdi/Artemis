declare function require(name:string);
const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const prefix = config.prefix;

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("message", (message) => {
    if (message.author.id === config.ownerID) {
        message.channel.send("Hello Hayaan");
    }
    if (!message.content.startsWith(prefix) || message.author.bot) 
        { return; }
    if (message.content.startsWith(prefix + "ping")) {
        message.channel.send("pong!");
    } else if (message.content.startsWith(prefix + "foo")) {
        message.channel.send("bar!");
    }
});

client.login(config.artemis_token);