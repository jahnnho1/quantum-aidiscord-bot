const dotenv = require("dotenv");
dotenv.config();
const UserRequest = require("./model/userRequest");
const mongoose = require("mongoose");
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

function almacenarInfoBD(prompt, respuestaIA, username) {
  const myModel = new UserRequest({
    user: username,
    question: prompt,
    answer: respuestaIA,
  });

  myModel
    .save()
    .then(() => console.log("Prompt guardado en la base de datos"))
    .catch((error) => console.error(error));
}

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.GTP_TOKEN,
});
const openai = new OpenAIApi(configuration);
async function ask(prompt, data) {
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
    almacenarInfoBD(
      prompt,
      response.data.choices[0].text,
      data.author.username
    );
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
