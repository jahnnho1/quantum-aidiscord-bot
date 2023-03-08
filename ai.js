const dotenv = require('dotenv');
dotenv.config();

//In ai.js
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.GTP_TOKEN,
});
const openai = new OpenAIApi(configuration);
async function ask(prompt) {
    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
const answer = response.data.choices[0].text;
return answer;
}

module.exports = {
    ask,
};