const dotenv = require("dotenv");
dotenv.config();
const UserRequest = require("../model/userRequest");
const PromptClass = require("../model/prompt");
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
    .then(() => console.log("Prompt guardado en la base de datos"))
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
      .then(() => resolve("exito"))
      .catch((error) => reject("error"));
  });
}

module.exports = {
  userCountPeticionRealizadas,
  almacenarInfoBD,
  guardarPrompt,
};
