import { Configuration, OpenAIApi } from "openai";
import GeneratPromptService from "./generate-prompt";
import { GenerateCoverLetterRequestBody } from "./models";
import { convertGeneratedPromptToCoverLetter } from "./text-converter.service";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  if (!configuration.apiKey) {
    return new Response(
      JSON.stringify({
        error: {
          message:
            "OpenAI API key not configured, please follow instructions in README.md",
        },
      }),
      {
        status: 500,
      }
    );
  }
  try {
    const result = await getPromptResponse();
    const coverLetter = result.data.choices[0].text as string;
    const bodyContent = await request.json();
    return new Response(
      JSON.stringify({
        result: convertGeneratedPromptToCoverLetter(
          coverLetter,
          flattenRequestBody(bodyContent)
        ),
      }),
      { status: 201 }
    );
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return new Response(JSON.stringify(error.response.data), {
        status: error.response.status,
      });
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return new Response(
        JSON.stringify({
          error: {
            message: "An error occurred during your request.",
          },
        }),
        { status: 500 }
      );
    }
  }
}

function getPromptResponse(request?: GenerateCoverLetterRequestBody) {
  const generatePromptService = new GeneratPromptService(openai);
  return generatePromptService.generatePrompt();
}

function flattenRequestBody(body: GenerateCoverLetterRequestBody | null) {
  if (!body) {
    return {};
  }
  return {
    applyerName: body.name,
    managerName: body.targetCompany.name,
    signedName: body.name,
    industry: "Tech",
    targetCompanyName: body.targetCompany.name,
    applyPossition: body.applyPossition,
  };
}
