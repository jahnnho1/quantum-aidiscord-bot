const dotenv = require("dotenv");
dotenv.config();

//In ai.js
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.GTP_TOKEN,
});
const openai = new OpenAIApi(configuration);
async function ask(prompt) {
    let response;
  try {
    response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.2,
      presence_penalty: 0.0,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      response = error.response.data;
    } else {
      console.log(error.message);
      response = error.message;
    }
  }
  const answer = response.data.choices[0].text;
  return answer;
}

module.exports = {
  ask,
};
