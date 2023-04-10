const { Configuration, OpenAIApi } = require("openai");

async function sendMessage(input) {
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${input}\n`,
      max_tokens: 2000,
      temperature: 0.3,
    });
  
    const text = response.data.choices[0].text.trim();
    return text;
}

export default sendMessage;