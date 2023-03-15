const dotenv = require("dotenv");
dotenv.config();
const UserRequest = require("../model/userRequest");
const PromptClass = require("../model/prompt");
const ConversacionRequest = require("../model/conversacion");

const mongoose = require("mongoose");
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

function almacenarInfoBD(
  prompt,
  respuestaIA,
  username,
  idDiscord,
  requestType
) {
  const objUserRequest = new UserRequest({
    user: username,
    idDiscord: idDiscord,
    requestType: requestType,
    question: prompt,
    answer: respuestaIA,
  });
  objUserRequest
    .save()
    .then(() => console.log("The prompt has been saved in the database."))
    .catch((error) => console.error(error));
}

async function userCountPeticionRealizadas(data) {
  return new Promise((resolve, reject) => {
    UserRequest.countDocuments({ user: data.author.username })
      .then((count) => {
        resolve(count);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

async function guardarPrompt(data) {
  const prompt = data.content.substring(15);
  const user = data.author.username;
  const idDiscord = data.author.id;
  const objPrompt = new PromptClass({
    user,
    idDiscord,
    prompt,
    nivel: "1",
  });
  return new Promise((resolve, reject) => {
    objPrompt
      .save()
      .then(() => resolve("success"))
      .catch((error) => reject("error"));
  });
}

function almacenarConversacionBD(
  idConversacion,
  username,
  discordId,
  requestType,
  prompt,
  answer
) {
  const objUserRequest = new ConversacionRequest({
    idConversacion,
    username,
    discordId,
    requestType,
    prompt,
    answer,
  });
  objUserRequest
    .save()
    .then(() => console.log("The prompt has been saved in the database."))
    .catch((error) => console.error(error));
}

module.exports = {
  userCountPeticionRealizadas,
  almacenarInfoBD,
  guardarPrompt,
  almacenarConversacionBD,
};
