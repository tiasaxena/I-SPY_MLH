import fetch from "node-fetch";
//const fetch = require("./node_modules/node-fetch/src/index.js ")
//const fetch = require("node-fetch")
//import Discord, { Message } from "discord.js";
import Discord from "discord.js";
import { parse } from "path/posix";
//const Discord = require("discord.js")
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]})

let api_url = 
     "http://127.0.0.1:5000/" ;


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

// client.on("messageCreate", msg => {
  
//   if (msg.author.bot) return
//   if (msg.content === "hi") {
//     msg.reply("hello");
//   }
//   else if (msg.content === "abc") {
//     msg.reply("def");
//   }
// })


//nsfw link filtering
var arr = ["pornhub", "redtube", "xvideo", "xhamster", "xnxx"];

let apiname;
client.on("messageCreate", msg => {
      if (msg.author.bot) return
      const link = msg.content;

      if(link.includes('https://www.')) {
        const site = link.slice(12);   //returns(site) leetcode.com/problems/decode-string/
        const index = site.indexOf('.');  //retuns(index) 8
        const sitename = site.slice(0, index); //returns(sitename) leetcode
        let count = 0;
        arr.forEach((item) => {
          if(item === sitename) {
            count = 1;
          } 
        })
        if(count > 0) {
            msg.reply("⚠️  This message is inappropriate and goes against the community guidelines. PLease delete it or else strict actions will be taken. ⚠️");
          } 
        }
        else {
          //api_url = api_url + msg.content;
          try {
            apiname = (api_url + msg.content).replaceAll(' ', '_');

            getapi(apiname);
          
            //console.log(tia);
          // console.log(tia.ans);

            
          }
          
          catch(e) {console.log(e); }
          // msg.reply(data.ans);
         
        }
})






//const mySecret = process.env['TOKEN']
const mySecret = "OTI5MzI1Mzk0MzQyMDgwNTYz.YdlruA.R1zgqSMu5pM4S5CdKwRppFAvVJI";
client.login(mySecret);

// http://127.0.0.1:5000/name/3/0/13/1/0/5


// Defining async function
async function getapi(url) {
  try {
    const response = await fetch(url);
    // Storing data in form of JSON
    let data = await response.json();
    //const variableName = JSON.parse(data);
    console.log(data.ans);
    console.log(apiname);
    console.log(typeof(data));

    if (data.ans == 1) {
      client.on("messageCreate", msg => {
        if (msg.author.bot) return;
        else {
        msg.reply("⚠️  This message is inappropriate and goes against the community guidelines. PLease delete it or else strict actions will be taken. ⚠️"); }
    }) 
  }
    
    //console.log(variableName.ans);
    //return data.ans ;
    //dict={}
  }
    // Storing response
    catch(e) {console.log(e); }
}
// Calling that async function

