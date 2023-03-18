import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from "next";
import GeneratPromptService from "./generate-prompt";
import { RequestBody } from "./models";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request: NextApiRequest, res: NextApiResponse) {
  if (!configuration.apiKey) {
    return res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
  }
  try {
    const result = await getPromptResponse();
    result.data.choices[0].text;
    return res.status(200).json({
      result,
    });
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function getPromptResponse(request?: RequestBody) {
  const generatePromptService = new GeneratPromptService(openai);
  return generatePromptService.generatePrompt();
}
