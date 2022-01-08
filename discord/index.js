import fetch from "node-fetch";
//const fetch = require("./node_modules/node-fetch/src/index.js ")
//const fetch = require("node-fetch")
import Discord from "discord.js";
//const Discord = require("discord.js")
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]})

const api_url = 
     "http://127.0.0.1:5000/name/3/0/13/1/0/5" ;


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("messageCreate", msg => {
  const data = getapi(api_url);
  if (msg.author.bot) return
  if (msg.content === "hi") {
    msg.reply("hello");
  }
  else if (msg.content === "abc") {
    msg.reply("def");
  }
})

//const mySecret = process.env['TOKEN']
const mySecret = "OTI4MjU2NjQ0Mjk3NjgyOTQ0.YdWIXg.h4zkQTkl7R_e5IrR5d0fdnex3zk";
client.login(mySecret);

// http://127.0.0.1:5000/name/3/0/13/1/0/5


// Defining async function
async function getapi(url) {

    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    var data = await response.json();
    console.log(data.Probability);
    return data ;

}
// Calling that async function

