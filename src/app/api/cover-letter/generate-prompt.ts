import { Configuration, OpenAIApi } from "openai";


export default class GeneratPromptService {
    openai: OpenAIApi;
    constructor(openai: OpenAIApi) {
        this.openai = openai;
    }

    generatePrompt() {
        return this.openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Create cover a letter template that have these parameters: applyerName, managerName, applyPossition, targetCompanyName, currentSkills, industry, signedName. The generated result no more than 100 tokens. The start of the letter should be like this:\n\"Dear ${managerName}, \nMy name is ${applyerName}\"\n\nDear ${managerName}, \nMy name is ${applyerName}, and I am writing to express my interest in the ${applyPossition} position at ${targetCompanyName}. With my current skills in ${currentSkills} and my experience in the ${industry}, I am confident that I can make a positive contribution to your team. \n\nI am excited about the opportunity to join ${targetCompanyName} and I am eager to learn more about the position and the company. I am available for an interview at your earliest convenience. \n\nThank you for your time and consideration. \n\nSincerely, \n${signedName}",
            temperature: 0.3,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          });
    }
}