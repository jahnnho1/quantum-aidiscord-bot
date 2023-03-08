const dotenv = require('dotenv');
const { ask } = require("./ai.js");
const { askImage } = require("./iaImagen.js");
const { Client, Events, GatewayIntentBits } = require("discord.js");
dotenv.config();


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", async () => {
  client.user.setActivity("Sigan ladrando Heiters");
  console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {

  if (message.content.substring(0, 4) === "!ask") {
    console.log(`entro a texto`);
    const prompt = message.content.substring(1); //remove the exclamation mark from the message
    const answer = await ask(prompt); //prompt GPT-3
    console.log(answer)
    client.channels.fetch(message.channelId).then(channel => channel.send(`${answer}`));
    //const prompt = message.content.substring(1); //remove the exclamation mark from the message
    //const answer = await ask(prompt); //prompt GPT-3
    //client.channels.fetch(message.channelId).then(channel => channel.send(answer));
  }

  if (message.content.substring(0, 6) === "!image") {
    console.log(`Entro a imagen`); 
    const prompt = message.content.substring(7); //remove the exclamation mark from the message
    const answer = await askImage(prompt); //prompt GPT-3
    console.log(answer)
    client.channels.fetch(message.channelId).then(channel => channel.send(`${answer}`));
  }

});






client.login(process.env.DISCORD_TOKEN);
