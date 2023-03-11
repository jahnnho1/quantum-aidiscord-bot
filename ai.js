const dotenv = require("dotenv");
dotenv.config();
const { almacenarInfoBD } = require("./utils/funcionesUsers.js");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.GTP_TOKEN,
});
const openai = new OpenAIApi(configuration);

async function ask(data) {
  const model = "text-davinci-003";
  const prompt = data.content.substring(4);
  const temperature = 0.7;
  const max_tokens = 750;
  const top_p = 1;
  const frequency_penalty = 0.2;
  const presence_penalty = 0.0;
  const username = data.author.username;
  const discordId = data.author.id;
  const request = "ask";

  try {
    response = await openai.createCompletion({
      model,
      prompt,
      temperature,
      max_tokens,
      top_p,
      frequency_penalty,
      presence_penalty,
    });
    almacenarInfoBD(
      prompt,
      response.data.choices[0].text,
      username,
      discordId,
      request
    );
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
  const answer =
    response.data.choices[0].text ||
    "This content may violate our content policy. ";
  return answer;
}

module.exports = {
  ask,
};
