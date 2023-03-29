const dotenv = require("dotenv");
dotenv.config();
const { almacenarInfoBD } = require("./utils/funcionesUsers.js");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.GTP_TOKEN,
});
const openai = new OpenAIApi(configuration);

async function askImage(data) {
  const size = "512x512";
  const prompt = data.content.substring(7);
  const n = 1;
  const username = data.author.username;
  const discordId = data.author.id;
  const request = "image";
  try {
    const response = await openai.createImage({
      prompt,
      n,
      size,
    });
    const image_url = response.data.data[0].url;
    almacenarInfoBD(prompt, image_url, username, discordId, request);
    return image_url;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}


module.exports = {
  askImage,
};
