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

async function userCountPeticionRealizadas(usuario) {
  return new Promise((resolve, reject) => {
    UserRequest.countDocuments({ user: usuario })
      .then((count) => {
        console.log(
          `Hay ${count} documentos en la tabla que pertenecen al usuario ${usuario}.`
        );
        resolve(count);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

async function guardarPrompt(prompt, username, idDiscord) {
  const objPrompt = new PromptClass({
    user: username,
    idDiscord: idDiscord,
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
