import { OpenAIApi } from "openai";
import { AdditionalInformationType } from "./models";

export default class GeneratPromptService {
  openai: OpenAIApi;
  constructor(openai: OpenAIApi) {
    this.openai = openai;
  }

  generatePrompt(skills: string) {
    return this.openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        'Create cover a letter template that have these parameters: applyerName, managerName, applyPossition, targetCompanyName, industry, signedName. The letter should cover information like: name, willingness to work. The start of the letter should be like this: \n"Dear ${managerName}, \nMy name is ${applyerName}',
      temperature: 0.3,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
  }
}
