const dotenv = require("dotenv");
dotenv.config();


//In ai.js
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.GTP_TOKEN,
});
const openai = new OpenAIApi(configuration);

async function askImage(prompt) {
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "256x256",
    });
    const image_url = response.data.data[0].url;
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
