const dotenv = require('dotenv');
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
  client.user.setActivity("Hello World!");
  console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.content.substring(0, 1) === "!") {
    console.log(`${message.content}`)
    //const prompt = message.content.substring(1); //remove the exclamation mark from the message
    //const answer = await ask(prompt); //prompt GPT-3
    //client.channels.fetch(message.channelId).then(channel => channel.send(answer));
  }
});

client.login(process.env.DISCORD_TOKEN);
