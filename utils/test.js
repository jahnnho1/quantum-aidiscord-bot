const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.GTP_TOKEN,
});
const openai = new OpenAIApi(configuration);
const userHistories = new Map();

async function conversationChat(data) {
  const prompt = data.content.substring(5);
  const username = data.author.username;
  const discordId = data.author.id;
  const userId = data.author.id;
  const history = userHistories.get(userId) || [];
  const userMessage = { role: "user", content: prompt };
  const requestType = "conversation";

  // Agregar el mensaje del usuario al historial
  history.push(userMessage);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: history,
  });

  const answer = response.data.choices[0].message.content;
  console.log(answer);
  if (answer) {
    const iaMessage = { role: "assistant", content: answer };
    // Agregar el mensaje de la IA al historial
    history.push(iaMessage);
    userHistories.set(userId, history);
    console.log(userHistories);
    return answer;
  } else {
    return "Lo siento, no pude generar una respuesta.";
  }
}

module.exports = {
  conversationChat,
};
