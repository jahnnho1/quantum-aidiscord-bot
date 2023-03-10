const dotenv = require("dotenv");
const { ask } = require("./ai.js");
const { askImage } = require("./iaImagen.js");
const {
  userCountPeticionRealizadas,
  guardarPrompt,
} = require("./peticiones/funcionesUsers.js");

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

client.on(Events.MessageCreate, async (data) => {
  if (data.content.substring(0, 4) === "!ask") {
    console.log(`entro a solicitud de pregunta`);
    const answer = await ask(data);
    console.log(answer);
    client.channels
      .fetch(data.channelId)
      .then((channel) => channel.send(`${answer}`));
  }
  if (data.content.substring(0, 6) === "!image") {
    console.log(`Entro a imagen`);
    const answer = await askImage(data);
    console.log(answer);
    client.channels
      .fetch(data.channelId)
      .then((channel) => channel.send(`${answer}`));
  }
  if (data.content.substring(0, 3) === "!yo") {
    console.log(`Entro a mis stats`);
    const userId = `<@${data.author.id}>`;
    await userCountPeticionRealizadas(data)
      .then((count) => {
        client.channels
          .fetch(data.channelId)
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
  if (data.content.substring(0, 15) === "!guardarPrompt ") {
    console.log(`Entro a guardar prompt`);
    const userId = `<@${data.author.id}>`;
    await guardarPrompt(data)
      .then((estado) => {
        client.channels
          .fetch(data.channelId)
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
