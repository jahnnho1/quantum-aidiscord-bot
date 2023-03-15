const dotenv = require("dotenv");
const { ask, conversationChat } = require("./ai.js");
const { askImage } = require("./iaImagen.js");
const {
  userCountPeticionRealizadas,
  guardarPrompt,
} = require("./utils/funcionesUsers.js");

const {
  Client,
  Events,
  GatewayIntentBits,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
dotenv.config();

const prefix = process.env.PREFIX;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", async () => {
  client.user.setActivity("Bot humanitario.");
  console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.on(Events.MessageCreate, async (data) => {
  if (data.content.startsWith(`${prefix}ask`)) {
    console.log(`An inquiry request was submitted."`);
    const answer = await ask(data);
    console.log(answer);
    client.channels
      .fetch(data.channelId)
      .then((channel) => channel.send(`${answer}`));
  }

  if (data.content.startsWith(`${prefix}image`)) {
    console.log(`An image request was submitted`);
    const answer = await askImage(data);
    console.log(answer);
    client.channels
      .fetch(data.channelId)
      .then((channel) => channel.send(`${answer}`));
  }

  if (data.content.startsWith(`${prefix}yo`)) {
    console.log(`A request to review user statistics was submitted.`);
    const userId = `<@${data.author.id}>`;
    await userCountPeticionRealizadas(data)
      .then((count) => {
        client.channels
          .fetch(data.channelId)
          .then((channel) =>
            channel.send(
              `El usuario ${userId}! ha realizado ${count} peticiones. `
            )
          );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (data.content.startsWith(`${prefix}guardarPrompt`)) {
    console.log(`A request to save prompt was submitted.`);
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

  if (data.content.startsWith(`${prefix}chat`)) {
    console.log(`A request to chat conversation was submitted.`);
    const answer = await conversationChat(data);
    client.channels
      .fetch(data.channelId)
      .then((channel) => channel.send(`${answer}`))
      .catch((err) => {
        console.log(err);
      });
  }

  // ! Request is under development.
  if (data.content.startsWith(`${prefix}total`)) {
    const exampleEmbed = new EmbedBuilder()
      .setColor(0x00ae86)
      .setTitle("Some title")
      .setURL("https://discord.js.org/")
      .setAuthor({
        name: data.author.username,
        iconURL: "https://i.imgur.com/AfFp7pu.png",
        url: "https://discord.js.org",
      })
      .setDescription("Some description here")
      .setThumbnail("https://i.imgur.com/AfFp7pu.png")
      .addFields(
        { name: "Regular field title", value: "Some value here" },
        {
          name: "Inline field title",
          value: "Some value herexxxxxxxxxxxxxx",
          inline: false,
        }
      )
      .setImage(data.author.displayAvatarURL())
      .setTimestamp()
      .setFooter({
        text: "Some footer text here",
        iconURL: client.user.avatarURL(),
      });
    client.channels
      .fetch(data.channelId)
      .then((channel) => channel.send({ embeds: [exampleEmbed] }));
  }

  // ! Request is under development.
  if (data.content.startsWith(`${prefix}firma`)) {
    const file = new AttachmentBuilder("./assets/firma.png");

    const exampleEmbed = {
      title: "Mi caballito de victoria",
      url: "https://discord.js.org",
      image: {
        url: "attachment://discordjs.png",
      },
    };

    client.channels
      .fetch(data.channelId)
      .then((channel) =>
        channel.send({ embeds: [exampleEmbed], files: [file] })
      );
  }

  // ! Request is under development.
  if (data.content.startsWith(`${prefix}test`)) {
    const mencionado = data.mentions.users.first();
    const id = mencionado.id;
    const nombre = mencionado.username;
    const avatar = mencionado.avatarURL();

    console.log(mencionado);

    client.channels
      .fetch(data.channelId)
      .then((channel) => channel.send(avatar || "hello guys"));
  }
});

client.login(process.env.DISCORD_TOKEN);
