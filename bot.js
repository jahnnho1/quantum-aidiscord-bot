const dotenv = require("dotenv");
const { ask } = require("./ai.js");
const { askImage } = require("./iaImagen.js");
const { userCountPeticionRealizadas, guardarPrompt } = require("./peticiones/funcionesUsers.js");

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
  client.user.setActivity("Veneco tu abuela!");
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
    const answer = await askImage(prompt, message);
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
  if (message.content.substring(0, 15) === "!guardarPrompt ") {
    console.log();
    console.log(`Entro a guardar prompt`);
    const userId = `<@${message.author.id}>`;
    const prompt = message.content.substring(15);
    await guardarPrompt(prompt, message.author.username, message.author.id)
      .then((estado) => {
        client.channels
          .fetch(message.channelId)
          .then((channel) =>
            channel.send(
              `El prompt creado por ${userId}! fue almacenado con ${estado}. `
            )
          );
      })
      .catch((err) => {
        console.log(err);
      });
  }


});

client.login(process.env.DISCORD_TOKEN);
