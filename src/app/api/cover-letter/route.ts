import { extractOpenAIChatMessage, extractOpenAICompletion } from "@/app/utils/openai.utils";
import { Configuration, OpenAIApi } from "openai";
import GenerateAdditionalInformationService from "./generate-additional.service";
import GeneratPromptService from "./generate-prompt";
import { AdditionalInformationType, GenerateCoverLetterRequestBody } from "./models";
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
            "OpenAI API key not configured",
        },
      }),
      {
        status: 500,
      }
    );
  }
  try {
    const result: any = await getPromptResponse();
    const coverLetter = extractOpenAICompletion(result) as string;
    const bodyContent = await request.json();
    let responseData = convertGeneratedPromptToCoverLetter(
      coverLetter,
      flattenRequestBody(bodyContent)
    );
    if (bodyContent.skills?.length) {
      const yearsOfExperiencePrompt = await generateAdditionalInformation(AdditionalInformationType.EXPERIENCE_DESCRIPTION, responseData as string, bodyContent.skills);
      responseData = extractOpenAIChatMessage(yearsOfExperiencePrompt) as string;
    }
    return new Response(
      JSON.stringify({
        result: responseData,
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

function getPromptResponse() {
  const generatePromptService = new GeneratPromptService(openai);
  return generatePromptService.generatePrompt();
}

async function generateAdditionalInformation(type: AdditionalInformationType, previousContext: string, additionalData: any) {
  const generateAdditionalService = new GenerateAdditionalInformationService(openai);
  let result: any = previousContext;
  if (type === AdditionalInformationType.EXPERIENCE_DESCRIPTION) {
    result = await generateAdditionalService.generateExperienceSkills(previousContext, additionalData, 500);
  }
  else if (type === AdditionalInformationType.STANDOUT_SIGHTS) {
    result = await generateAdditionalService.generateStandoutSights(previousContext, additionalData, 500);
  }
  console.log(result)
  return result;
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
