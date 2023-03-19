const dotenv = require("dotenv");
dotenv.config();
const {
  almacenarInfoBD,
  almacenarConversacionBD,
} = require("./utils/funcionesUsers.js");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.GTP_TOKEN,
});
const openai = new OpenAIApi(configuration);
const userHistories = new Map();

async function ask(data) {
  const model = "text-davinci-003";
  const prompt = data.content.substring(4);
  const temperature = 0.7;
  const max_tokens = 500;
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

async function conversationChat(data) {
  const prompt = data.content.substring(5);
  const username = data.author.username;
  const discordId = data.author.id;
  const userId = data.author.id;
  const history = userHistories.get(userId) || [];
  const userMessage = { role: "user", content: prompt };
  const requestType = "conversation";
  const max_tokens = 500;

  // Agregar el mensaje del usuario al historial
  history.push(userMessage);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: history,
    max_tokens
  });

  const answer = response.data.choices[0].message.content;
  console.log(answer);
  if (answer) {
    const iaMessage = { role: "assistant", content: answer };
    // Agregar el mensaje de la IA al historial
    history.push(iaMessage);
    userHistories.set(userId, history);
    almacenarConversacionBD(
      userId,
      discordId,
      username,
      history,
      requestType
    );
    console.log(userHistories);
    return answer;
  } else {
    return "Lo siento, no pude generar una respuesta.";
  }
}

module.exports = {
  ask,
  conversationChat,
};
