import { AxiosResponse } from "axios";
import { CreateChatCompletionResponse, CreateCompletionResponse } from "openai";

export function extractOpenAIChatMessage(response: AxiosResponse<CreateChatCompletionResponse, any>) {
    return response.data.choices[0].message?.content;
}

export function extractOpenAICompletion(response: AxiosResponse<CreateCompletionResponse, any>) {
    return response.data.choices[0].text;
}