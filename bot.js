const dotenv = require("dotenv");
const { ask, userCountPeticionRealizadas } = require("./ai.js");
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
    const prompt = message.content.substring(1);
    const answer = await ask(prompt, message);
    console.log(answer);
    client.channels
      .fetch(message.channelId)
      .then((channel) => channel.send(`${answer}`));
  }
  if (message.content.substring(0, 6) === "!image") {
    console.log(`Entro a imagen`);
    const prompt = message.content.substring(7);
    const answer = await askImage(prompt);
    console.log(answer);
    client.channels
      .fetch(message.channelId)
      .then((channel) => channel.send(`${answer}`));
  }
  if (message.content.substring(0, 3) === "!yo") {

    console.log();
    console.log(`Entro a mis stats`);
    const userId = `<@${message.author.id}>`;
    await userCountPeticionRealizadas(message.author.username)
      .then((count) => {
        client.channels
          .fetch(message.channelId)
          .then((channel) =>
            channel.send(
              `El Veneco ${userId}! ha realizado ${count} peticiones. `
            )
          );
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

client.login(process.env.DISCORD_TOKEN);
